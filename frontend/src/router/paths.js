export const ROUTES = {
  SETUP_BUSINESS: "/app/setup/business",
  SETUP_AUTH: "/app/setup/auth",
  DASHBOARD: "/app/dashboard",
  TRANSACTIONS: "/app/transactions",
  TRANSACTIONS_REVIEW: "/app/transactions/review",
  CLOSING: (month) => `/app/closing/${month}`,
  CLOSING_EXPORT: (month) => `/app/closing/${month}/export`,
  CHAT: "/app/chat",
  PAYROLL: "/app/payroll",
}; 