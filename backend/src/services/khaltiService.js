import { env } from "../config/env.js";
import { writeDb } from "../database/jsonDb.js";
import { httpError } from "../middleware/errorHandler.js";
import { displayDate } from "../utils/format.js";

const plans = {
  monthly: {
    label: "EduFlow Premium Monthly",
    amount: 500,
    months: 1,
  },
  yearly: {
    label: "EduFlow Premium Yearly",
    amount: 2999,
    months: 12,
  },
};

function getPlan(plan = "yearly") {
  return plans[plan] || plans.yearly;
}

function amountToPaisa(amount) {
  return Math.round(Number(amount) * 100);
}

function ensureKhaltiConfig() {
  if (!env.khalti.secretKey) {
    throw httpError(500, "Khalti secret key is not configured.");
  }
}

async function khaltiRequest(path, payload) {
  ensureKhaltiConfig();

  let response;
  try {
    response = await fetch(`${env.khalti.baseUrl}${path}`, {
      method: "POST",
      headers: {
        Authorization: `key ${env.khalti.secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw httpError(502, "Unable to connect to Khalti sandbox. Check your internet connection and Khalti sandbox URL.");
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw httpError(response.status, data.detail || data.message || "Khalti request failed.");
  }

  return data;
}

function activateMembershipFromPayment(db, user, payment, lookupData) {
  const plan = getPlan(payment.plan);
  const start = new Date();
  const expiry = new Date(start);
  expiry.setMonth(expiry.getMonth() + plan.months);

  let membership = db.memberships.find((item) => item.userId === user.id);
  if (!membership) {
    membership = { userId: user.id };
    db.memberships.push(membership);
  }

  Object.assign(membership, {
    active: true,
    startDate: start.toISOString().slice(0, 10),
    expiryDate: expiry.toISOString().slice(0, 10),
  });

  const transactionId = lookupData.transaction_id || payment.pidx;
  const existingTransaction = db.transactions.find((item) => item.id === transactionId);

  if (!existingTransaction) {
    db.transactions.unshift({
      id: transactionId,
      user: user.name,
      email: user.email,
      course: plan.label,
      amount: plan.amount,
      method: "Khalti",
      date: displayDate(),
      status: "Paid",
    });
  }

  payment.status = "Completed";
  payment.transactionId = transactionId;
  payment.verifiedAt = new Date().toISOString();
  return membership;
}

export async function initiateKhaltiMembership(db, user, { plan = "yearly" } = {}, frontendOrigin) {
  const selectedPlan = getPlan(plan);
  const purchaseOrderId = `EDUFLOW-${user.id}-${Date.now()}`;
  const amountPaisa = amountToPaisa(selectedPlan.amount);
  const websiteUrl = frontendOrigin || env.khalti.websiteUrl;

  const payload = {
    return_url: `${websiteUrl}/payment/khalti`,
    website_url: websiteUrl,
    amount: amountPaisa,
    purchase_order_id: purchaseOrderId,
    purchase_order_name: selectedPlan.label,
    customer_info: {
      name: user.name,
      email: user.email,
      phone: "9800000001",
    },
  };

  const khalti = await khaltiRequest("/epayment/initiate/", payload);

  if (!khalti.payment_url) {
    throw httpError(502, "Khalti did not return a payment URL.");
  }

  const payment = {
    pidx: khalti.pidx,
    paymentUrl: khalti.payment_url,
    purchaseOrderId,
    purchaseOrderName: selectedPlan.label,
    userId: user.id,
    plan,
    amount: selectedPlan.amount,
    amountPaisa,
    status: "Initiated",
    createdAt: new Date().toISOString(),
  };

  db.khaltiPayments.push(payment);
  await writeDb(db);

  return {
    pidx: payment.pidx,
    paymentUrl: payment.paymentUrl,
    purchaseOrderId: payment.purchaseOrderId,
    amount: payment.amount,
    amountPaisa: payment.amountPaisa,
  };
}

export async function verifyKhaltiMembership(db, user, { pidx, purchase_order_id: purchaseOrderId }) {
  if (!pidx) throw httpError(400, "Khalti pidx is required.");

  const payment = db.khaltiPayments.find((item) => item.pidx === pidx || item.purchaseOrderId === purchaseOrderId);
  if (!payment) throw httpError(404, "Payment request not found.");
  if (payment.userId !== user.id) throw httpError(403, "This payment does not belong to the current user.");

  const lookup = await khaltiRequest("/epayment/lookup/", { pidx });
  payment.lookup = lookup;
  payment.status = lookup.status;

  if (Number(lookup.total_amount) !== Number(payment.amountPaisa)) {
    payment.status = "Amount mismatch";
    await writeDb(db);
    throw httpError(400, "Khalti amount verification failed.");
  }

  if (lookup.status !== "Completed") {
    await writeDb(db);
    return {
      verified: false,
      status: lookup.status,
      membership: db.memberships.find((item) => item.userId === user.id) || { active: false },
    };
  }

  const membership = activateMembershipFromPayment(db, user, payment, lookup);
  await writeDb(db);

  return {
    verified: true,
    status: lookup.status,
    membership,
    transactionId: payment.transactionId,
  };
}
