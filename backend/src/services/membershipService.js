export function getMembership(db, user) {
  const membership = db.memberships.find((item) => item.userId === user.id) || {
    active: false,
    startDate: null,
    expiryDate: null,
  };
  const payments = db.transactions.filter((item) => item.email === user.email);

  return { membership, payments };
}
