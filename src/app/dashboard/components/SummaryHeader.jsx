import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../../../components/Button";

function SummaryHeader({ month, isClosed, isApproving, onApprove }) {
  return (
    <Wrapper>
      <TitleGroup>
        <Title>{month}월 세무 현황 결산</Title>
      </TitleGroup>

      {!isClosed && (
        <Button
          variant="button_large_brown"
          size="large"
          onClick={onApprove}
          disabled={isApproving}
        >
          {isApproving ? "승인 처리 중..." : `${month}월 장부 마감 승인하기`}
        </Button>
      )}
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

SummaryHeader.propTypes = {
  month: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  isClosed: PropTypes.bool.isRequired,
  isApproving: PropTypes.bool.isRequired,
  onApprove: PropTypes.func.isRequired,
};

export default SummaryHeader;
