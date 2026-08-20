import PropTypes from "prop-types";
import styled, { css } from "styled-components";

// 필터 토글용 pill 버튼. Button과 달리 항상 아이콘+텍스트를 가로로 배치하고 크기가 콘텐츠에 맞춰진다.
const VARIANT_STYLES = {
  unchecked: css`
    background-color: #f2ebe4;
    color: #9b6e62;
  `,

  checked: css`
    background: var(--primary-brand-primary-500, #3d251e);
    color: var(--primary-brand-primary-100, #fdf9f3);
  `,
};

function Chip({ variant = "unchecked", children, ...props }) {
  return (
    <StyledChip $variant={variant} {...props}>
      {children}
    </StyledChip>
  );
}

Chip.propTypes = {
  variant: PropTypes.oneOf(Object.keys(VARIANT_STYLES)),
  children: PropTypes.node,
};

const StyledChip = styled.button`
  border: none;
  border-radius: 12px;
  display: flex;
  padding: 8px 16px;
  align-items: center;
  gap: 8px;

  font-family: Outfit;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;

  cursor: pointer;

  ${({ $variant }) => VARIANT_STYLES[$variant]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Chip;
