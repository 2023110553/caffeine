import styled, { css } from "styled-components";

const VARIANT_STYLES = {
  unchecked_button: css`
    background-color: ${({ theme }) => theme.colors.bg_gray};
    color: ${({ theme }) => theme.colors.txt_beige};
    display:flex;
    align-items: center;
  `,
  

  checked_button_brown: css`
    background-color: ${({ theme }) => theme.colors.bg_brown};
    color: ${({ theme }) => theme.colors.txt_white};
    display:flex;
    align-items: center;
  `,

  checked_button_beige: css`
    background-color: ${({ theme }) => theme.colors.bg_beige};
    color: ${({ theme }) => theme.colors.txt_brown};
    
  `,

  button_large_brown: css`
    background-color: ${({ theme }) => theme.colors.bg_brown};
    color: ${({ theme }) => theme.colors.txt_white};
  `,

  button_large_green: css`
    background-color: ${({ theme }) => theme.colors.bg_green};
    color: ${({ theme }) => theme.colors.txt_white};
  `,

  button_large_gray: css`
    background-color: ${({ theme }) => theme.colors.bg_dark_gray};
    color: ${({ theme }) => theme.colors.txt_white};
    
  `,
};

const SIZE_STYLES = {
  small: css`
    width: 127.6px;
    padding: 10px 0;
    font-size: 14px; /* TODO: design token화 */
  `,

  large: css`
    width: 239.2px;
    padding: 14px 0; /* TODO: design token화 */
    font-size: 16px; /* TODO: design token화 */
  `,
};

function Button({
  variant = "unchecked_button",
  size = "small",
  children,
  ...props
}) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border: none;
  border-radius: ${({ theme }) => theme.radius.medium_large};
  font-weight: 600;
  cursor: pointer;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ $variant }) => VARIANT_STYLES[$variant]}
  ${({ $size }) => SIZE_STYLES[$size]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Button;