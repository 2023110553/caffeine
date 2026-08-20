import styled from "styled-components";

function SalesExpenseCard({ summary }) {
  const { month, total_sales, total_expense, net_profit, profit_margin, expense_breakdown } =
    summary;
  const expenseRatio = (total_expense / total_sales) * 100;

  const DOT_COLORS = ["#8B6E60", "#A08070", "#C8A882", "#DDD0C4"]; // TODO: theme.js에 없는 값들, 진→연 브라운 그라데이션

  return (
    <Card>
      <Label>{month}월 매출·매입 종합 요약</Label>

      <StatBlock>
        <StatRow>
          <StatLabel>총 매출</StatLabel>
          <StatValue>{total_sales.toLocaleString()}원</StatValue>
        </StatRow>
        <GaugeTrack>
          <GaugeFill $color="dark" style={{ width: "100%" }} />
        </GaugeTrack>
      </StatBlock>

      <StatBlock>
        <StatRow>
          <StatLabel>총 지출</StatLabel>
          <StatValue>{total_expense.toLocaleString()}원</StatValue>
        </StatRow>
        <GaugeTrack>
          <GaugeFill $color="beige" style={{ width: `${expenseRatio}%` }} />
        </GaugeTrack>
      </StatBlock>

      <ProfitBox>
        <ProfitLeft>
          <ProfitLabel>순 영업 이익</ProfitLabel>
          <ProfitMargin>영업이익률 {profit_margin}%</ProfitMargin>
        </ProfitLeft>
        <ProfitValue>
          {net_profit.toLocaleString()}
          <ProfitUnit>원</ProfitUnit>
        </ProfitValue>
      </ProfitBox>

      <SectionTitle>지출 항목 분류</SectionTitle>
      <ExpenseList>
        {expense_breakdown.map((item, i) => (
          <ExpenseRow key={item.category}>
            <Dot style={{ backgroundColor: DOT_COLORS[i % DOT_COLORS.length] }} />
            <CategoryName>{item.category}</CategoryName>
            <Amount>{item.amount.toLocaleString()}원</Amount>
            <Ratio>{item.ratio}%</Ratio>
          </ExpenseRow>
        ))}
      </ExpenseList>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fffcf8; /* TODO: theme.js에 없는 값 */
  border: 0.8px solid #e4d9cc; /* TODO: theme.js에 없는 값 */
  border-radius: ${({ theme }) => theme.radius.large};
  padding: 22px 26px; /* TODO: design token화 */
`;

const Label = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-family: "Noto Sans KR", sans-serif; /* TODO: design token화 */
  font-size: 13px; /* TODO: design token화 */
  font-weight: 700;
  line-height: 19.5px; /* TODO: design token화 */
  padding-bottom: 18px; /* TODO: design token화 */
`;

const StatBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px; /* TODO: design token화 */

  & + & {
    margin-top: 12px; /* TODO: design token화 */
  }
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StatLabel = styled.span`
  color: #5c3d33; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif; /* TODO: design token화 */
  font-size: 12px; /* TODO: design token화 */
  font-weight: 500;
  line-height: 18px; /* TODO: design token화 */
`;

const StatValue = styled.span`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-family: Outfit, sans-serif; /* TODO: design token화 */
  font-size: 14px; /* TODO: design token화 */
  font-weight: 700;
  line-height: 21px; /* TODO: design token화 */
`;

const GaugeTrack = styled.div`
  height: 9px; /* TODO: design token화 */
  border-radius: 5px; /* TODO: design token화 */
  background-color: #f0e8dc; /* TODO: theme.js에 없는 값 */
  overflow: hidden;
`;

const GaugeFill = styled.div`
  height: 100%;
  background-color: ${({ $color, theme }) => ($color === "dark" ? theme.colors.txt_brown : theme.colors.bg_beige)};
`;

const ProfitBox = styled.div`
  background-color: #ecfdf5; /* TODO: theme.js에 없는 값 */
  border: 0.8px solid #a7f3d0; /* TODO: theme.js에 없는 값 */
  border-radius: 11px; /* TODO: design token화 */
  padding: 13px 15px; /* TODO: design token화 */
  margin-top: 16px; /* TODO: design token화 */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfitLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ProfitLabel = styled.p`
  color: #059669; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif; /* TODO: design token화 */
  font-size: 11px; /* TODO: design token화 */
  font-weight: 700;
  line-height: 16.5px; /* TODO: design token화 */
`;

const ProfitMargin = styled.p`
  color: #34d399; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif; /* TODO: design token화 */
  font-size: 10px; /* TODO: design token화 */
  font-weight: 400;
  line-height: 15px; /* TODO: design token화 */
`;

const ProfitValue = styled.p`
  color: #059669; /* TODO: theme.js에 없는 값 */
  font-family: Outfit, sans-serif; /* TODO: design token화 */
  font-size: 20px; /* TODO: design token화 */
  font-weight: 800;
  line-height: 30px; /* TODO: design token화 */
`;

const ProfitUnit = styled.span`
  font-size: 12px; /* TODO: design token화 */
  font-weight: 600;
  line-height: 18px; /* TODO: design token화 */
`;

const SectionTitle = styled.p`
  color: #8b6e60; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif; /* TODO: design token화 */
  font-size: 11px; /* TODO: design token화 */
  font-weight: 600;
  line-height: 16.5px; /* TODO: design token화 */
  padding-top: 16px; /* TODO: design token화 */
`;

const ExpenseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; /* TODO: design token화 */
  padding-top: 10px; /* TODO: design token화 */
`;

const ExpenseRow = styled.div`
  display: grid;
  grid-template-columns: 10px 1fr 80px 30px;
  align-items: center;
  gap: 8px; /* TODO: design token화 */
`;

const Dot = styled.span`
  width: 7px; /* TODO: design token화 */
  height: 7px;
  border-radius: 2px;
`;

const CategoryName = styled.span`
  color: #5c3d33; /* TODO: theme.js에 없는 값 */
  font-size: 11px; /* TODO: design token화 */
`;

const Amount = styled.span`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 11px; /* TODO: design token화 */
  font-weight: 600;
  text-align: right;
`;

const Ratio = styled.span`
  color: #8c6b5a; /* TODO: theme.js에 없는 값 */
  font-size: 10px; /* TODO: design token화 */
  text-align: right;
`;

export default SalesExpenseCard;
