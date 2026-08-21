import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideBar from "./SideBar";

function AppLayout() {
  return (
    <Container>
      <SideBar />
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh; /* 뷰포트 높이로 고정해 페이지 전체가 아닌 내부 영역에서만 스크롤되게 함 */
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.bg_white};
  color: ${({ theme }) => theme.colors.txt_brown};
`;

const Content = styled.main`
  flex: 1;
  min-height: 0; /* flex item 기본값(auto) 그대로면 자식의 overflow 스크롤이 동작하지 않아 명시적으로 0으로 설정 */
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export default AppLayout;
