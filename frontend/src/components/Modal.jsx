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
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Content = styled.div`
  background-color: ${({ theme }) => theme.colors.paper};
  border-radius: ${({ theme }) => theme.radius.medium};
  padding: 24px; /* TODO: design token화 */
  min-width: 320px; /* TODO: design token화 */
`;

const Title = styled.h2`
  margin-bottom: 16px; /* TODO: design token화 */
  color: ${({ theme }) => theme.colors.ink};
`;

export default Modal;