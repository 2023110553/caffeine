import PropTypes from "prop-types";
import styled from "styled-components";

function Modal({
  open,
  onClose,
  title,
  children,
  width = "640px",
  height = "612px",
  radius = "20px",
  padding = "32px",
  background,
  boxShadow = "0 24px 64px rgba(61, 37, 30, 0.22), 0 4px 16px rgba(61, 37, 30, 0.1)",
  hideHeader = false,
  flexColumn = false,
}) {
  if (!open) return null;

  return (
    <Overlay onClick={onClose}>
      <Content
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        $width={width}
        $height={height}
        $radius={radius}
        $padding={padding}
        $background={background}
        $boxShadow={boxShadow}
        $flexColumn={flexColumn}
        onClick={(e) => e.stopPropagation()}
      >
        {!hideHeader && (
          <Header>
            {title && <Title id="modal-title">{title}</Title>}

            <CloseButton type="button" onClick={onClose} aria-label="닫기">
              ×
            </CloseButton>
          </Header>
        )}

        {children}
      </Content>
    </Overlay>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  width: PropTypes.string,
  height: PropTypes.string,
  radius: PropTypes.string,
  padding: PropTypes.string,
  background: PropTypes.string,
  boxShadow: PropTypes.string,
  hideHeader: PropTypes.bool,
  flexColumn: PropTypes.bool,
};

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

  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};

  padding: ${({ $padding }) => $padding};

  background-color: ${({ $background, theme }) => $background ?? theme.colors.bg_white};

  border-radius: ${({ $radius }) => $radius};

  box-shadow: ${({ $boxShadow }) => $boxShadow};

  ${({ $flexColumn }) =>
    $flexColumn &&
    `
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `}

  overflow-y: auto;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const CloseButton = styled.button`
  width: 1.75rem;
  height: 1.75rem;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0;

  border: 0.05rem solid #e8d9c8;
  border-radius: 0.375rem;

  background: #f5ede0;
  color: #6b3f30;

  font-size: 1.25rem;
  line-height: 1;

  cursor: pointer;

  &:hover {
    background: #e8d9c8;
    color: ${({ theme }) => theme.colors.txt_brown};
  }
`;

export default Modal;
