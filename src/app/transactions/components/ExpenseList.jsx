import styled from "styled-components";
import ExpenseListItem from "./ExpenseListItem";

const LEGEND = [
  { key: "business", label: "사업 지출", color: "bg_brown" },
  { key: "personal", label: "개인 지출", color: "bg_beige" },
  { key: "unclassified", label: "미분류", color: "bg_gray" },
];

function ExpenseList({
  transactions,
  summary,
  selectedFilter,
  onCategoryChange,
  onItemCategoryChange,
}) {
  const totalCount = transactions.length;
  const classifiedCount = totalCount - summary.unclassified.count;

  const filteredTransactions = transactions.filter((tx) => {
    if (selectedFilter === "all") return true;

    if (selectedFilter === "unclassified") {
      return tx.category === null;
    }

    return tx.category === selectedFilter;
  });
  return (
    <Wrapper>
      <ListHeader>
        <HeaderRow>
          <TitleGroup>
            <Title>전체 거래 내역</Title>
            <Count>
              {classifiedCount}/{totalCount}건 분류됨
            </Count>
          </TitleGroup>

          <Legend>
            {LEGEND.map(({ key, label, color }) => (
              <LegendItem key={key}>
                <Dot $color={color} />
                {label} {summary[key].count}건
              </LegendItem>
            ))}
          </Legend>
        </HeaderRow>

        <ProgressTrack>
          {LEGEND.map(({ key, color }) => {
            const ratio = totalCount === 0 ? 0 : (summary[key].count / totalCount) * 100;

            if (ratio === 0) return null;

            return <ProgressSegment key={key} $color={color} style={{ width: `${ratio}%` }} />;
          })}
        </ProgressTrack>
      </ListHeader>

      <CardGrid>
        {filteredTransactions.map((tx) => (
          <ExpenseListItem
            key={tx.transaction_id}
            transaction={tx}
            onCategoryChange={onCategoryChange}
            onItemCategoryChange={onItemCategoryChange}
          />
        ))}
      </CardGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1;
  min-width: 0;
  min-height: 0; /* 스크롤 체인 4단계 */

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.txt_white};
  border-radius: ${({ theme }) => theme.radius.medium_large};
  padding: 20px; /* TODO: design token화 */
`;

const ListHeader = styled.div`
  flex-shrink: 0; /* 고정 영역 */

  display: flex;
  flex-direction: column;

  gap: 8px; /* TODO: design token화 */
  margin-bottom: 12px; /* TODO: design token화 */
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px; /* TODO: design token화 */
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-weight: 600;
`;

const Count = styled.p`
  color: ${({ theme }) => theme.colors.txt_beige};
  font-size: 13px; /* TODO: design token화 */
`;

const Legend = styled.div`
  display: flex;
  gap: 12px; /* TODO: design token화 */
  align-items: center;
`;

const LegendItem = styled.span`
  display: flex;
  align-items: center;
  gap: 6px; /* TODO: design token화 */

  color: ${({ theme }) => theme.colors.txt_beige};
  font-size: 12px; /* TODO: design token화 */
`;

const Dot = styled.span`
  width: 8px; /* TODO: design token화 */
  height: 8px;

  border-radius: 50%;
  background-color: ${({ theme, $color }) => theme.colors[$color]};
`;

const CardGrid = styled.div`
  flex: 1;
  min-width: 0;
  min-height: 0;

  overflow-x: auto;
  overflow-y: auto;

  scrollbar-width: none;

  display: grid;
  grid-template-columns: repeat(2, minmax(295.2px, 1fr));
  gap: 12px;

  align-content: start;
  align-items: start;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 6px; /* TODO: design token화 */

  display: flex;

  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.bg_gray};
  overflow: hidden;

  margin-top: 8px; /* TODO: design token화 */
`;

const ProgressSegment = styled.div`
  height: 100%;
  background-color: ${({ theme, $color }) => theme.colors[$color]};
  transition: width 0.2s ease;
`;

export default ExpenseList;
