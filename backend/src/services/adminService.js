import { publicUser } from "../utils/format.js";

export function listAdminUsers(db) {
  return db.users
    .filter((user) => user.role === "user")
    .map((user) => {
      const membership = db.memberships.find((item) => item.userId === user.id);
      const enrollments = db.enrollments.filter((item) => item.userId === user.id);

      return {
        ...publicUser(user),
        status: membership?.active ? "Active" : "Free",
        courses: enrollments.length,
        courseProgress: enrollments.map((enrollment) => {
          const course = db.courses.find((item) => item.slug === enrollment.courseSlug);
          const total = course?.lessonItems.length || 0;
          return {
            title: course?.title || enrollment.courseSlug,
            progress: `${total ? Math.round((enrollment.completedLessons.length / total) * 100) : 0}%`,
          };
        }),
      };
    });
}

export function listAdminTransactions(db) {
  const transactions = (db.transactions || []).map((transaction) => {
    const transactionEmail = String(transaction.email || "").toLowerCase();
    const user = db.users.find((item) => item.email.toLowerCase() === transactionEmail);

    return {
      ...transaction,
      avatar: user ? publicUser(user).avatar : "",
      profileImage: user?.profileImage || null,
    };
  });
  const transactionIds = new Set(transactions.map((transaction) => String(transaction.id)));
  const khaltiRows = (db.khaltiPayments || [])
    .filter((payment) => !transactionIds.has(String(payment.transactionId || payment.pidx)))
    .map((payment) => {
      const user = db.users.find((item) => item.id === payment.userId);
      const publicProfile = user ? publicUser(user) : null;

      return {
        id: payment.transactionId || payment.pidx || payment.purchaseOrderId,
        user: user?.name || "Unknown User",
        email: user?.email || "",
        avatar: publicProfile?.avatar || "",
        profileImage: user?.profileImage || null,
        course: payment.purchaseOrderName || "EduFlow Premium",
        amount: payment.amount || 0,
        method: "Khalti",
        date: formatStoredDate(payment.createdAt),
        status: normalizePaymentStatus(payment.status),
      };
    });

  return [...transactions, ...khaltiRows].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getAdminDashboard(db) {
  const users = db.users.filter((user) => user.role === "user");
  const activeMembers = users.filter((user) => db.memberships.some((item) => item.userId === user.id && item.active)).length;
  const transactions = listAdminTransactions(db);
  const paid = transactions.filter((item) => item.status === "Paid");
  const issuedCertificates = listIssuedCertificates(db);

  return {
    stats: {
      totalUsers: users.length,
      activeMembers,
      freeUsers: users.length - activeMembers,
      courses: db.courses.length,
      certificates: issuedCertificates.length,
      revenue: paid.reduce((sum, item) => sum + item.amount, 0),
    },
    growth: buildUserGrowth(users),
    certificatesIssued: buildCertificatesIssued(issuedCertificates),
    payments: transactions.slice(0, 5),
  };
}

function listIssuedCertificates(db) {
  return db.enrollments
    .map((enrollment) => {
      const course = db.courses.find((courseItem) => courseItem.slug === enrollment.courseSlug);
      if (!course || !enrollment.certificate?.issuedAt) return null;

      return enrollment.certificate;
    })
    .filter(Boolean);
}

function buildCertificatesIssued(certificates) {
  const months = getRecentMonths();

  return months.map((month) => ({
    month: month.month,
    value: certificates.filter((certificate) => {
      const issuedAt = parseStoredDate(certificate.issuedAt);
      return issuedAt && issuedAt >= month.monthStart && issuedAt < month.nextMonthStart;
    }).length,
  }));
}

function buildUserGrowth(users) {
  const months = getRecentMonths();

  return months.map((month) => ({
    month: month.month,
    value: users.filter((user) => {
      const joinedAt = parseStoredDate(user.createdAt);
      return joinedAt && joinedAt < month.nextMonthStart;
    }).length,
  }));
}

function getRecentMonths() {
  const now = new Date();

  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);

    return {
      month: date.toLocaleDateString("en-US", { month: "short" }),
      monthStart: new Date(date.getFullYear(), date.getMonth(), 1),
      nextMonthStart: new Date(date.getFullYear(), date.getMonth() + 1, 1),
    };
  });
}

function parseStoredDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function normalizePaymentStatus(status) {
  if (status === "Completed" || status === "Paid") return "Paid";
  if (status === "User canceled" || status === "Expired" || status === "Refunded" || status === "Amount mismatch") return "Failed";
  return "Pending";
}

function formatStoredDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}
