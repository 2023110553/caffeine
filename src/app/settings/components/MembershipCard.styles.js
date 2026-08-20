import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.card_white};
  border: 0.8px solid #eae0d2; /* TODO: theme.js에 없는 값 */
  border-radius: ${({ theme }) => theme.radius.large};
  box-shadow: 0 1px 4px 0 rgba(61, 37, 30, 0.05);
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  padding: 20px 24px 16px 24px; /* 피그마 스펙 */
  border-bottom: 0.8px solid #f0e8da; /* TODO: theme.js에 없는 값 */
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const Title = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ theme }) => theme.colors.txt_brown};
  font-family: var(--Font-familiy-Noto, "Noto Sans KR");
  font-size: 14.5px; /* TODO: design token화 */
  font-weight: 700;
  line-height: 21.75px; /* TODO: design token화 - 150% */
  letter-spacing: -0.145px; /* TODO: design token화 */
`;

export const Description = styled.p`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 4px; /* TODO: design token화 */
  color: #a07860; /* TODO: theme.js에 없는 값 */
  font-family: var(--Font-familiy-Noto, "Noto Sans KR");
  font-size: 12px; /* TODO: design token화 */
  font-weight: 400;
  line-height: 18px; /* TODO: design token화 - 150% */
`;

export const StatusBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 5px; /* TODO: design token화 */
  flex-shrink: 0;
  background-color: ${({ $bg }) => $bg}; /* TODO: theme.js에 없는 값 */
  color: ${({ $color }) => $color}; /* TODO: theme.js에 없는 값 (Functional-Success) */
  border-radius: 7px; /* TODO: theme.js에 없는 값 (기존 radius 토큰과 불일치) */
  padding: 4px 10px; /* TODO: design token화 */
  font-family: var(--Font-familiy-Noto, "Noto Sans KR");
  font-size: 11.5px; /* TODO: design token화 */
  font-weight: 700;
  line-height: 17.25px; /* TODO: design token화 - 150% */
`;

export const StatusDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${({ $color }) => $color}; /* TODO: theme.js에 없는 값 (Functional-Success) */
`;

const BANNER_TONE = {
  danger: { bg: "#fef2f2", color: "#b3261e" },
  notice: { bg: "#fef3c7", color: "#b45309" },
  muted: { bg: "#f3f4f6", color: "#6b7280" },
};

export const StatusBanner = styled.p`
  margin-top: 10px; /* TODO: design token화 */
  padding: 8px 12px; /* TODO: design token화 */
  border-radius: ${({ theme }) => theme.radius.small};
  background-color: ${({ $tone }) => BANNER_TONE[$tone].bg}; /* TODO: theme.js에 없는 값 */
  color: ${({ $tone }) => BANNER_TONE[$tone].color}; /* TODO: theme.js에 없는 값 */
  font-size: 12px; /* TODO: design token화 */
  line-height: 1.5;
  align-self: stretch;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  height: 489.25px;
  padding: 18px 24px;
  gap: 16px; /* TODO: design token화 */
`;

export const PlanBox = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  flex-shrink: 0;
  height: 395.65px;
  background-color: #f3eee6; /* TODO: theme.js에 없는 값 */
  border: 0.8px solid #e2d5c3; /* TODO: theme.js에 없는 값 */
  border-radius: ${({ theme }) => theme.radius.medium_large};
`;

export const PlanRow = styled.div`
  display: flex;
  height: 87.275px;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
  padding: 18px 20px 20px 20px; /* 피그마 스펙 */
`;

export const DividerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  padding: 0 20px;
`;

export const Divider = styled.div`
  height: 1px;
  align-self: stretch;
  background-color: #d9cabf; /* TODO: theme.js에 없는 값 */
`;

export const PlanGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
`;

export const PlanBadgeWrapper = styled.div`
  display: flex;
  padding: 2.525px 44.738px 7.75px 0;
  align-items: center;
  align-self: stretch;
`;

export const LightningIcon = styled.img`
  flex-shrink: 0;
  width: 9px;
  height: 10px;
  object-fit: contain;
`;

export const CardIcon = styled.img`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  object-fit: contain;
`;

export const CheckIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 14px;
  height: 15px;
  padding-top: 1px;
`;

export const CheckIcon = styled.img`
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  object-fit: contain;
`;

export const PlanBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 5px; /* TODO: design token화 */
  background-color: ${({ theme }) => theme.colors.bg_brown};
  color: ${({ theme }) => theme.colors.txt_white};
  border-radius: 6px; /* TODO: theme.js에 없는 값 (기존 radius 토큰과 불일치) */
  padding: 2px 9px; /* TODO: design token화 */
  font-family: var(--Font-familiy-Noto, "Noto Sans KR");
  font-size: 10.5px; /* TODO: design token화 */
  font-weight: 700;
  line-height: 15.75px; /* TODO: design token화 - 150% */
  letter-spacing: 0.42px; /* TODO: design token화 */
`;

export const PriceGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-top: 2px; /* TODO: design token화 */
  flex-shrink: 0;
`;

export const Price = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-self: stretch;
  color: ${({ theme }) => theme.colors.txt_brown};
  text-align: right;
  font-family: var(--Font-familiy-Noto, "Noto Sans KR");
  font-size: 16px; /* TODO: design token화 */
  font-weight: 700;
  line-height: 24px; /* TODO: design token화 - 150% */
  letter-spacing: -0.16px; /* TODO: design token화 */
`;

export const PlanName = styled.p`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  color: ${({ theme }) => theme.colors.txt_brown};
  font-family: var(--Font-familiy-Noto, "Noto Sans KR");
  font-size: 19px; /* TODO: design token화 */
  font-weight: 700;
  line-height: 22.8px; /* TODO: design token화 - 120% */
  letter-spacing: -0.38px; /* TODO: design token화 */
`;

export const InfoList = styled.div`
  display: flex;
  padding: 14px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const InfoLabel = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #9e7060; /* TODO: theme.js에 없는 값 */
  font-family: var(--Font-familiy-Noto, "Noto Sans KR");
  font-size: 12px; /* TODO: design token화 */
  font-weight: 400;
  line-height: 18px; /* TODO: design token화 - 150% */
`;

export const InfoValue = styled.span`
  display: flex;
  align-items: center;
  gap: 7px; /* TODO: design token화 */
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 12.5px; /* TODO: design token화 */
  font-weight: 600;
`;

export const DateValue = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ theme }) => theme.colors.txt_brown};
  font-family: "JetBrains Mono", monospace;
  font-size: 12.5px; /* TODO: design token화 */
  font-weight: 500;
  line-height: 18.75px; /* TODO: design token화 - 150% */
`;

export const PaymentMethodText = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ theme }) => theme.colors.txt_brown};
  font-family: var(--Font-familiy-Noto, "Noto Sans KR");
  font-size: 12.5px; /* TODO: design token화 */
  font-weight: 400;
  line-height: 18.75px; /* TODO: design token화 - 150% */
`;

export const DDayBadge = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fef3c7; /* TODO: theme.js에 없는 값 */
  color: #b45309; /* TODO: theme.js에 없는 값 */
  border-radius: 6px; /* TODO: theme.js에 없는 값 (기존 radius 토큰과 불일치) */
  padding: 2px 8px; /* TODO: design token화 */
  font-family: var(--Font-familiy-Noto, "Noto Sans KR");
  font-size: 11px; /* TODO: design token화 */
  font-weight: 600;
  line-height: 16.5px; /* TODO: design token화 - 150% */
`;

export const BenefitList = styled.div`
  display: flex;
  padding: 14px 20px 18px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;
  align-self: stretch;
`;

export const BenefitItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 9px; /* TODO: design token화 */
  align-self: stretch;
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 12.5px; /* TODO: design token화 */
`;

export const BenefitText = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ theme }) => theme.colors.txt_brown};
  font-family: var(--Font-familiy-Noto, "Noto Sans KR");
  font-size: 12.5px; /* TODO: design token화 */
  font-weight: 400;
  line-height: 18.125px; /* TODO: design token화 - 145% */
`;

export const ButtonRow = styled.div`
  display: flex;
  align-self: stretch;
  gap: 8px; /* TODO: design token화 */

  > button {
    flex: 1;
    width: auto;
    border: 0.8px solid #e2d5c3;
  }
`;
