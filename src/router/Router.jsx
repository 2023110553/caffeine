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

// ROUTES는 절대경로("/app/xxx")로 정의돼 있어, AppLayout 하위 <Route>가 요구하는 상대경로로 맞춰줌
const relativeToApp = (route) => route.replace(/^\/app\//, "");

function Router() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<IntroPage />} />

      {/* /app 하위 페이지는 사이드바 등 공통 레이아웃(AppLayout)을 함께 사용 */}
      <Route path="/app" element={<AppLayout />}>
        {/* 아래 라우트들은 Phase 2~5에서 순차적으로 구현될 예정 (TODO) */}
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
