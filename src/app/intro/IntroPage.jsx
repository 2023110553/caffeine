import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ROUTES } from "../../router/paths";

// public/assets 폴더 참조
const ASSETS = {
  BG: "/assets/bg-cafe-counter.png",
  LOGO_MARK: "/assets/logo-mark.png",
};

// 배경 이미지가 로드된 뒤 잠깐 멈췄다가 로고/타이틀/버튼(아웃로)이 등장하기까지의 지연 시간(초)
const OUTRO_DELAY = 2.8;

export default function IntroPage() {
  const navigate = useNavigate();
  const [showOutro, setShowOutro] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOutro(true);
    }, OUTRO_DELAY * 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <PageWrapper $bg={ASSETS.BG}>
      <AnimatePresence>
        {showOutro && (
          <OutroWrapper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <LogoMark src={ASSETS.LOGO_MARK} alt="" />
            <Title>카페비서</Title>
            <HomeButton type="button" onClick={handleGoHome}>
              홈화면으로 이동
            </HomeButton>
          </OutroWrapper>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}

// --- Styled Components ---

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;

  background-image: url(${({ $bg }) => $bg});
  background-size: cover;
  background-position: center;
`;

const OutroWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  z-index: 3;
`;

const LogoMark = styled.img`
  width: 120px;
  height: auto;
  filter: drop-shadow(0 4px 8px rgba(93, 64, 55, 0.2));
`;

const Title = styled.h1`
  margin: 0;
  /* 배경 이미지의 브라운 뚜껑 색상에 맞춤 */
  color: #5d4037;
  font-family: Fraunces, serif, system-ui;
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const HomeButton = styled.button`
  padding: 16px 40px;
  border: none;
  border-radius: 100px;

  /* 배경 이미지의 컵홀더 색상에 맞춤 */
  background: #d7ccc8;
  color: #3e2723;

  font-size: 17px;
  font-weight: 700;
  cursor: pointer;

  box-shadow:
    0 8px 16px rgba(93, 64, 55, 0.15),
    0 2px 2px rgba(93, 64, 55, 0.1) inset;

  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: #e0d7d3;
    box-shadow: 0 10px 20px rgba(93, 64, 55, 0.2);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 4px 8px rgba(93, 64, 55, 0.1);
  }
`;
