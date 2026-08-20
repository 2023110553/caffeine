import PropTypes from "prop-types";
import styled, { css } from "styled-components";

// 분류 상태 표시용 pill. 클릭 불가능한 뱃지라는 점에서 Chip(토글 버튼)과 구분된다.
const VARIANT_STYLES = {
  unclassified: css`
    background-color: #ffe2d7;
    color: #9b6e62;
  `,

  classified: css`
    background: #7b9ec5;
    color: var(--primary-brand-primary-100, #fdf9f3);
  `,
};

function Badge({ variant = "unclassified", children }) {
  return <StyledBadge $variant={variant}>{children}</StyledBadge>;
}

Badge.propTypes = {
  variant: PropTypes.oneOf(Object.keys(VARIANT_STYLES)),
  children: PropTypes.node,
};

const StyledBadge = styled.span`
  border-radius: 12px;
  display: flex;
  padding: 8px 16px;
  align-items: center;
  gap: 8px;

  text-align: center;
  font-family: Outfit;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;

  ${({ $variant }) => VARIANT_STYLES[$variant]}
`;

export default Badge;
