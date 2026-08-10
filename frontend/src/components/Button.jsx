import styled, { css } from "styled-components";

const VARIANT_STYLES = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.bg_gray};
    color: ${({ theme }) => theme.colors.txt_beige};
  `,
  secondary: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.ink};
    border: 1px solid ${({ theme }) => theme.colors.line};
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.paper};
  `,
};

function Button({ variant = "primary", children, ...props }) {
  return (
    <StyledButton $variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  padding: 10px 0; /* TODO: design token화 */
  border: 12px;
  border-radius: ${({ theme }) => theme.radius.medium_large};
  width: 156px;
  font-weight: 600;
  cursor: pointer;
  ${({ $variant }) => VARIANT_STYLES[$variant]}
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Button;