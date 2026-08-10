import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import IntroRoutes from "../intro/router";
import AppLayout from "../layouts/AppLayout";


function Router() {
  return (
    <Routes>
      {IntroRoutes}

      {/* 카페비서 서비스: /app 하위 전부 AppLayout 공유 */}
      <Route path="/app" element={<AppLayout />}>
        {/* 아직 페이지 없음 — Phase 2~5에서 하나씩 채워질 자리 */}
        {/* <Route index element={<DashboardPage />} /> */}
        {/* <Route path="setup/business" element={<BusinessSetupPage />} /> */}
        {/* <Route path="setup/auth" element={<AuthSetupPage />} /> */}
        {/* <Route path="dashboard" element={<DashboardPage />} /> */}
        {/* <Route path="transactions/review" element={<TransactionReviewPage />} /> */}
        {/* <Route path="closing/:month" element={<ClosingPage />} /> */}
        {/* <Route path="chat" element={<ChatPage />} /> */}
      </Route>
    </Routes>
  );
}

export default Router;