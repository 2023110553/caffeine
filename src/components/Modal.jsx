import styled from "styled-components";

function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <Overlay onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        {title && <Title>{title}</Title>}
        {children}
      </Content>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.45);

  z-index: 1000;
`;

const Content = styled.div`
  box-sizing: border-box;

  width: 640px;
  height: 612px;

  padding: 32px;

  background-color: ${({ theme }) => theme.colors.bg_white};

  border-radius: 20px;

  box-shadow:
    0 24px 64px rgba(61, 37, 30, 0.22),
    0 4px 16px rgba(61, 37, 30, 0.1);

  overflow-y: auto;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h2`
  margin: 0;

  color: ${({ theme }) => theme.colors.txt_brown};

  font-family: "Noto Sans KR", sans-serif;
  font-size: 22px;
  font-weight: 800;
  line-height: 33px;

  letter-spacing: -0.88px;
`;

export default Modal;