import { Route, Routes } from "react-router-dom";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<div>준비 중</div>} />
      {/* 페이지 확정되면 여기 추가 */}
    </Routes>
  );
}

export default Router;