import styled, { css } from "styled-components";

const VARIANT_STYLES = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.paper};
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
  padding: 10px 16px; /* TODO: design token화 */
  border: none;
  border-radius: ${({ theme }) => theme.radius.small};
  font-weight: 600;
  cursor: pointer;
  ${({ $variant }) => VARIANT_STYLES[$variant]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Button;