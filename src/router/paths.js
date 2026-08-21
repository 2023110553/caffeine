export const ROUTES = {
  HOME: "/",
  SETUP_BUSINESS: "/app/setup/business", // TODO: 온보딩(CODEF 인증) 페이지용 경로, 아직 미구현
  SETUP_AUTH: "/app/setup/auth", // TODO: 온보딩(CODEF 인증) 페이지용 경로, 아직 미구현
  SETTINGS: "/app/settings",
  DASHBOARD: "/app/dashboard",
  BENCHMARK: "/app/benchmark",
  TRANSACTIONS: "/app/transactions",
  TRANSACTIONS_REVIEW: "/app/transactions/review",
  CLOSING: (month) => `/app/closing/${month}`,
  CLOSING_EXPORT: (month) => `/app/closing/${month}/export`,
  CHAT: "/app/chat",
  PAYROLL: "/app/payroll",
};
