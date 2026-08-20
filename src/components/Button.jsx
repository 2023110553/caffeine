import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const VARIANT_STYLES = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.bg_brown};
    color: ${({ theme }) => theme.colors.txt_white};
    display: flex;
    align-items: center;
  `,

  unchecked_button: css`
    background-color: ${({ theme }) => theme.colors.bg_gray};
    color: ${({ theme }) => theme.colors.txt_beige};
    display: flex;
    align-items: center;
  `,

  checked_button_brown: css`
    background-color: ${({ theme }) => theme.colors.bg_brown};
    color: ${({ theme }) => theme.colors.txt_white};
    display: flex;
    align-items: center;
  `,

  checked_button_beige: css`
    background-color: ${({ theme }) => theme.colors.bg_beige};
    color: ${({ theme }) => theme.colors.txt_brown};
  `,

  button_large_brown: css`
    background-color: ${({ theme }) => theme.colors.bg_brown};
    color: ${({ theme }) => theme.colors.txt_white};
    font-size: 0.875rem;
  `,

  button_large_green: css`
    background-color: ${({ theme }) => theme.colors.bg_green};
    color: ${({ theme }) => theme.colors.txt_white};
    font-size: 0.875rem;
  `,

  button_large_gray: css`
    background-color: ${({ theme }) => theme.colors.bg_dark_gray};
    color: ${({ theme }) => theme.colors.txt_white};
    font-size: 0.75rem;
    display: flex;
  `,
};

const SIZE_STYLES = {
  small: css`
    width: 127.6px;
    padding: 10px 0;
    font-size: 14px;
  `,

  large: css`
    width: 239.2px;
    padding: 14px 0;
    font-size: 16px;
  `,
};

function Button({ variant = "unchecked_button", size = "small", children, ...props }) {
  return (
    <StyledButton $variant={variant} $size={size} {...props}>
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(Object.keys(VARIANT_STYLES)),
  size: PropTypes.oneOf(Object.keys(SIZE_STYLES)),
  children: PropTypes.node,
};

const StyledButton = styled.button`
  border: none;
  border-radius: ${({ theme }) => theme.radius.medium_large};
  font-weight: 600;
  cursor: pointer;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ $size }) => SIZE_STYLES[$size]}
  ${({ $variant }) => VARIANT_STYLES[$variant]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Button;
