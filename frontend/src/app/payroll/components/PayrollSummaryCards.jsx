import styled from "styled-components";

function PayrollSummaryCards({ totalExpense, totalWithholdingTax }) {
  return (
    <Wrapper>
      <Card>
        <Label>이번 달 총 인건비 지출</Label>
        <Value>{totalExpense.toLocaleString()}원</Value>
        <NotePill $tone="neutral">
          💡 세전 급여 + 사장님 부담 4대보험료
        </NotePill>
      </Card>

      <Card>
        <LabelRow>
          <Dot />
          <Label>9월 10일 납부할 원천세 합계</Label>
        </LabelRow>
        <Value>{totalWithholdingTax.toLocaleString()}원</Value>
        <NotePill $tone="warning">소득세 + 개인지방소득세</NotePill>
      </Card>

      <Card>
        <Label>급여명세서 파일 내보내기</Label>
        <Description>
          직원별 급여명세서를 PDF 또는 엑셀 파일로 일괄 내보낼 수 있습니다.
        </Description>
        {/* TODO: 파일 내보내기 기능 - 백엔드 API 확정 후 구현 */}
        <ExportButton type="button">
          ⬇ 급여명세서 파일 내보내기
        </ExportButton>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex-shrink: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px; /* TODO: design token화 */
  margin-bottom: 24px; /* TODO: design token화 */
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* TODO: design token화 */
  background-color: #FFFFFF; /* TODO: theme.js에 없는 값 - bg_white(#FDF9F3)와 다름, 토큰 추가 필요 */
  border: 0.8px solid #E8D9C8; /* TODO: theme.js에 없는 값 */
  border-radius: ${({ theme }) => theme.radius.large};
  padding: 24px; /* TODO: design token화 */
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px; /* TODO: design token화 */
`;

const Dot = styled.span`
  width: 6px; /* TODO: design token화 */
  height: 6px;
  border-radius: 50%;
  background-color: #B45309; /* TODO: theme.js에 없는 값 (주황 강조색) */
  flex-shrink: 0;
`;

const Label = styled.p`
  color: #8C6B5A; /* TODO: theme.js에 없는 값 - txt_beige와 유사하지만 다름 */
  font-size: 12px; /* TODO: design token화 */
  font-weight: 600;
`;

const Value = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 24px; /* TODO: design token화 */
  font-weight: 700;
`;

const Description = styled.p`
  color: #8C6B5A; /* TODO: 위와 동일 토큰 */
  font-size: 12.5px; /* TODO: design token화 */
  line-height: 1.4;
`;

const NOTE_TONE = {
  neutral: { bg: "#F5EDE0", text: "#8C6B5A", border: "transparent" },
  warning: { bg: "#FEF6EC", text: "#B45309", border: "#F3D9AB" },
};

const NotePill = styled.p`
  align-self: flex-start;
  background-color: ${({ $tone }) => NOTE_TONE[$tone].bg}; /* TODO: theme.js에 없는 값 */
  color: ${({ $tone }) => NOTE_TONE[$tone].text};
  border: 0.8px solid ${({ $tone }) => NOTE_TONE[$tone].border};
  border-radius: 999px;
  padding: 4px 10px; /* TODO: design token화 */
  font-size: 11.5px; /* TODO: design token화 */
`;

const ExportButton = styled.button`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px; /* TODO: design token화 */
  width: 100%;
  border: none;
  border-radius: ${({ theme }) => theme.radius.medium}; /* 피그마 실측 10px, medium(8px)로 근사 */
  background-color: ${({ theme }) => theme.colors.txt_brown};
  color: ${({ theme }) => theme.colors.txt_white};
  padding: 11px 16px; /* TODO: design token화 */
  font-size: 13px; /* TODO: design token화 */
  font-weight: 700;
  cursor: pointer;
`;

export default PayrollSummaryCards;