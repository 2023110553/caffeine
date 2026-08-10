import styled from "styled-components";
import Button from "../../../components/Button";

const BAR_COLOR = {
  business: "bg_brown",
  personal: "bg_beige",
  unclassified: "bg_gray",
};

function TaxImpactPanel({ summary, estimatedVat }) {
  const totalAmount =
    summary.business.total + summary.personal.total + summary.unclassified.total;

  return (
    <Wrapper>
      <PanelTitle>실시간 세금 영향</PanelTitle>

      <VatBox>
        <Label>현재 반영된 예상 부가세</Label>
        <VatAmount>{estimatedVat.toLocaleString()}원</VatAmount>
        <SubLabel>사업 지출의 10% 매입세액 공제</SubLabel>

        <StatGrid>
          <div>
            <StatLabel>사업 지출 합계</StatLabel>
            <StatValue>{summary.business.total.toLocaleString()}원</StatValue>
          </div>
          <div>
            <StatLabel>분류 건수</StatLabel>
            <StatValue>{summary.business.count}건</StatValue>
          </div>
        </StatGrid>
      </VatBox>

      <BreakdownTitle>분류 현황</BreakdownTitle>

      <SegmentBar>
        {["business", "personal", "unclassified"].map((key) => {
          const ratio = totalAmount === 0 ? 0 : (summary[key].total / totalAmount) * 100;
          if (ratio === 0) return null;
          return <Segment key={key} $color={BAR_COLOR[key]} style={{ width: `${ratio}%` }} />;
        })}
      </SegmentBar>

      <BreakdownList>
        <BreakdownRow>
          <RowLabel><Dot $color="bg_brown" />사업 지출</RowLabel>
          <RowValue>{summary.business.count}건 {summary.business.total.toLocaleString()}원</RowValue>
        </BreakdownRow>
        <BreakdownRow>
          <RowLabel><Dot $color="bg_beige" />개인 지출</RowLabel>
          <RowValue>{summary.personal.count}건 {summary.personal.total.toLocaleString()}원</RowValue>
        </BreakdownRow>
        <BreakdownRow>
          <RowLabel><Dot $color="bg_gray" />미분류</RowLabel>
          <RowValue>{summary.unclassified.count}건 {summary.unclassified.total.toLocaleString()}원</RowValue>
        </BreakdownRow>
      </BreakdownList>

      {summary.unclassified.count === 0 && (
        <Notice>✓ 모든 지출이 분류되었습니다! 부가세 공제를 최대로 받을 수 있어요.</Notice>
      )}

      <Button variant="button_large_brown" size="large">
        분류 완료 및 부가세 예측 반영하기
      </Button>
      <SavingText>절감 예상: {estimatedVat.toLocaleString()}원</SavingText>
    </Wrapper>
  );
}

const Wrapper = styled.aside`
  width: 280px; /* TODO: design token화 */
  flex-shrink: 0;
  height: 100%;
  overflow-y: auto; /* 안전장치: 내용 넘칠 경우에만 자체 스크롤 */
  display: flex;
  flex-direction: column;
  gap: 16px; /* TODO: design token화 */
  padding: 24px 20px; /* TODO: design token화 */
`;

const PanelTitle = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-weight: 700;
`;

const VatBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px; /* TODO: design token화 */
  background-color: ${({ theme }) => theme.colors.bg_beige};
  border-radius: ${({ theme }) => theme.radius.medium_large};
  padding: 16px; /* TODO: design token화 */
`;

const Label = styled.p`
  color: ${({ theme }) => theme.colors.txt_beige};
  font-size: 13px; /* TODO: design token화 */
`;

const VatAmount = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 22px; /* TODO: design token화 */
  font-weight: 700;
`;

const SubLabel = styled.p`
  color: ${({ theme }) => theme.colors.txt_beige};
  font-size: 12px; /* TODO: design token화 */
`;

const StatGrid = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px; /* TODO: design token화 */
`;

const StatLabel = styled.p`
  color: ${({ theme }) => theme.colors.txt_beige};
  font-size: 12px; /* TODO: design token화 */
`;

const StatValue = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-weight: 600;
  font-size: 14px; /* TODO: design token화 */
`;

const BreakdownTitle = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-weight: 600;
`;

const SegmentBar = styled.div`
  display: flex;
  width: 100%;
  height: 8px; /* TODO: design token화 */
  border-radius: ${({ theme }) => theme.radius.small};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.bg_gray};
`;

const Segment = styled.div`
  height: 100%;
  background-color: ${({ theme, $color }) => theme.colors[$color]};
`;

const BreakdownList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; /* TODO: design token화 */
`;

const BreakdownRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px; /* TODO: design token화 */
  color: ${({ theme }) => theme.colors.txt_brown};
`;

const RowLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 6px; /* TODO: design token화 */
`;

const RowValue = styled.span`
  color: ${({ theme }) => theme.colors.txt_beige};
`;

const Dot = styled.span`
  width: 8px; /* TODO: design token화 */
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme, $color }) => theme.colors[$color]};
`;

const Notice = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 13px; /* TODO: design token화 */
`;

const SavingText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 13px; /* TODO: design token화 */
`;



export default TaxImpactPanel;