import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useBusiness } from "../contexts/BusinessContext";

function AppLayout() {
    const { business } = useBusiness();

    // 온보딩 안 끝난 사용자는 setup으로 리다이렉트
  if (!business.isSetupComplete) {
    return <Navigate to="/app/setup/business" replace />;
  }
  // TODO: 온보딩(사업자 인증) 여부에 따라 /app/setup으로 리다이렉트하는 로직 여기 추가 예정
  return (
    <Container>
      <Sidebar>{/* TODO: 네비게이션 메뉴 (디자인 확정 후) */}</Sidebar>
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.paper};
  color: ${({ theme }) => theme.colors.ink};
`;

const Sidebar = styled.aside`
  width: 240px; /* TODO: design token화 */
  background-color: ${({ theme }) => theme.colors.background};
  flex-shrink: 0;
`;

const Content = styled.main`
  flex: 1;
  padding: 24px; /* TODO: design token화 */
`;

export default AppLayout;