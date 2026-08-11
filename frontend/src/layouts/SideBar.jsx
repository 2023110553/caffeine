import styled from "styled-components";
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../router/paths";

const MENU_ROUTE_MAP = {
  "홈": ROUTES.DASHBOARD,
  "지출 내역 분류": ROUTES.TRANSACTIONS_REVIEW,
  // "인건비 관리", "AI 세무 비서 챗봇", "설정"은 아직 라우트 없음 → 매핑 안 함
};

const SideBarContainer = styled.div`
  display: flex;
  width: 220px;
  
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  border-right: 0.8px solid rgba(255, 255, 255, 0.06);
  background: ${({ theme }) => theme.colors.bg_brown};
`;

const BrandWrapper = styled.div`
  display: flex;
  padding: 28px 20px 24px 20px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const LogoContent = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: #C9A882;

  img {
    display: flex;
    width: 37.832px;
    height: 36px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ theme }) => theme.colors.txt_white};
  font-family: Fraunces;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.4px;
`;

const MarketWrapper = styled.div`
  display: flex;
  padding-top: 20px;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
`;

const MarketContainer = styled.div`
 display: flex;
width: 179.2px;
padding: 10px 12px;
justify-content: space-between;
align-items: center;
border-radius: 12px;
border: 0.8px solid rgba(255, 255, 255, 0.10);
background: rgba(255, 255, 255, 0.07);
`;

const MarketContent = styled.div`
  display: flex;
height: 16px;
flex-direction: column;
align-items: flex-start;
color: #FDF9F3;
font-family: Outfit;
font-size: 12px;
font-style: normal;
font-weight: 600;
line-height: 16px; /* 133.333% */`;

const Navigation = styled.div`
display: flex;
height: 462.4px;
padding: 0 12px;
flex-direction: column;
align-items: flex-start;
flex-shrink: 0;
`;

const NavigationBtn = styled.div`
display: flex;
width: 195.2px;
padding: 10px 12px;
align-items: center;
gap: 12px;
border-radius: 12px;
background: ${({ $active }) =>
    $active ? "rgba(201, 168, 130, 0.18)" : "transparent"};
`;

const NavigationLogo = styled.p`
display: flex;
width: 20px;
flex-direction: column;
align-items: center;
flex-shrink: 0;
`;

const NavigationText = styled.p`
 color: ${({ $active }) =>
    $active ? "#C9A882" : "rgba(253, 249, 243, 0.50)"};
font-family: Outfit;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 20px; /* 142.857% */
`;

const UserInfoWrapper = styled.div`
display: flex;
padding: 0 12px 20px 12px;
flex-direction: column;
align-items: flex-start;
align-self: stretch;`;

const UserInfoContainer = styled.div`
display: flex;
padding: 12px;
align-items: center;
gap: 12px;
align-self: stretch;
border-radius: 12px;
background: rgba(255, 255, 255, 0.06);
`;

const UserIcon = styled.div`
display: flex;
width: 32px;
height: 32px;
justify-content: center;
align-items: center;
border-radius: 26843500px;
background: #5C3327;

color: #C9A882;
font-family: Outfit;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 20px; /* 142.857% */
`
    ;

const UserName = styled.div`
  color: #FDF9F3;
  font-family: Outfit;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
`;
const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    ["🏠", "홈"],
    ["📋", "지출 내역 분류"],
    ["👥", "인건비 관리"],
    ["🤖", "AI 세무 비서 챗봇"],
    ["⚙️", "설정"],
  ];

  return (
    <SideBarContainer>
      <BrandWrapper>
        <LogoContainer>
          <LogoContent>
            <img src={logo} alt="카페비서 로고" />
          </LogoContent>
          <Title>카페비서</Title>
        </LogoContainer>

        <MarketWrapper>
          <MarketContainer>
            <MarketContent>앵무101 김포마산점</MarketContent>
          </MarketContainer>
        </MarketWrapper>
      </BrandWrapper>

      <Navigation>
        {menus.map(([icon, name]) => {
          const path = MENU_ROUTE_MAP[name];
          const isActive = path && location.pathname === path;

          return (
            <NavigationBtn
              key={name}
              $active={isActive}
              onClick={() => path && navigate(path)}
            >
              <NavigationLogo>{icon}</NavigationLogo>
              <NavigationText $active={isActive}>{name}</NavigationText>
            </NavigationBtn>
          );
        })}
      </Navigation>

      <UserInfoWrapper>
        <UserInfoContainer>
          <UserIcon>유</UserIcon>
          <UserName>유지은 사장님</UserName>
        </UserInfoContainer>
      </UserInfoWrapper>
    </SideBarContainer>
  );
};

export default SideBar;