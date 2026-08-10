import { Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import ComponentPreviewPage from "../dev/ComponentPreviewPage"; // ⚠️ 임시 — 커밋 전 삭제

function Router() {
  return (
    <Routes>
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

      {/* ⚠️⚠️⚠️ 임시 라우트 — 컴포넌트 확인 끝나면 이 Route랑 위 import 삭제할 것 ⚠️⚠️⚠️ */}
      <Route path="/dev/components" element={<ComponentPreviewPage />} />
    </Routes>
  );
}

export default Router;