import { Routes, Route } from "react-router-dom";
import IntroPage from "../app/intro/IntroPage";
import AppLayout from "../layouts/AppLayout";
import TransactionReviewPage from "../app/transactions/TransactionReviewPage";
import ChatPage from "../app/chat/ChatPage";
import PayrollPage from "../app/payroll/PayrollPage";
import DashboardPage from "../app/dashboard/DashboardPage";
import SettingsPage from "../app/settings/SettingsPage";
import BenchmarkPage from "../app/benchmark/BenchmarkPage";
import { ROUTES } from "./paths";

// ROUTES는 "/app/xxx" 형태의 절대경로라, <Route>가 기대하는 AppLayout 기준 상대경로로 변환해서 사용
const relativeToApp = (route) => route.replace(/^\/app\//, "");

function Router() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<IntroPage />} />

      {/* 카페비서 서비스: /app 하위 전부 AppLayout 공유 */}
      <Route path="/app" element={<AppLayout />}>
        {/* 아직 페이지 없음 — Phase 2~5에서 하나씩 채워질 자리 */}
        {/* <Route index element={<DashboardPage />} /> */}
        {/* <Route path={relativeToApp(ROUTES.SETUP_BUSINESS)} element={<SetupBusinessPage />} /> */}
        {/* <Route path={relativeToApp(ROUTES.SETUP_AUTH)} element={<AuthSetupPage />} /> */}
        <Route path={relativeToApp(ROUTES.SETTINGS)} element={<SettingsPage />} />
        <Route path={relativeToApp(ROUTES.DASHBOARD)} element={<DashboardPage />} />
        <Route path={relativeToApp(ROUTES.BENCHMARK)} element={<BenchmarkPage />} />
        <Route
          path={relativeToApp(ROUTES.TRANSACTIONS_REVIEW)}
          element={<TransactionReviewPage />}
        />
        {/* <Route path="closing/:month" element={<ClosingPage />} /> */}
        <Route path={relativeToApp(ROUTES.CHAT)} element={<ChatPage />} />
        <Route path={relativeToApp(ROUTES.PAYROLL)} element={<PayrollPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
