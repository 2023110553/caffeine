import PropTypes from "prop-types";
import styled, { css, keyframes } from "styled-components";
import Button from "../../../components/Button";

const APPROVE_BUTTON_LABEL = {
  idle: (month) => `${month}월 장부 마감 승인하기`,
  approving: () => "승인 처리 중...",
  success: () => "✅ 저장 완료",
};

function SummaryHeader({ month, approveStatus, onApprove }) {
  return (
    <Wrapper>
      <TitleGroup>
        <Title>{month}월 세무 현황 결산</Title>
      </TitleGroup>

      <ApproveButton
        variant="button_large_brown"
        size="large"
        onClick={onApprove}
        disabled={approveStatus === "approving"}
        $status={approveStatus}
      >
        {APPROVE_BUTTON_LABEL[approveStatus](month)}
      </ApproveButton>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px; /* TODO: design token화 */
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 24px; /* TODO: design token화 */
  font-weight: 700;
`;

const SavePulse = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

const ApproveButton = styled(Button)`
  transition:
    background-color 0.2s ease,
    transform 0.15s ease;

  ${({ $status }) =>
    $status === "success" &&
    css`
      background-color: #4d9b6f !important; /* 저장 완료 피드백 - BusinessInfoForm SubmitButton과 동일 패턴 */
      animation: ${SavePulse} 0.35s ease;
    `}
`;

SummaryHeader.propTypes = {
  month: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  approveStatus: PropTypes.oneOf(["idle", "approving", "success"]).isRequired,
  onApprove: PropTypes.func.isRequired,
};

export default SummaryHeader;
