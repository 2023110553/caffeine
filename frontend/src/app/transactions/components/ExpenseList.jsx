import styled from "styled-components";
import ExpenseListItem from "./ExpenseListItem";

const LEGEND = [
  { key: "business", label: "사업 지출", color: "bg_brown" },
  { key: "personal", label: "개인 지출", color: "bg_beige" },
  { key: "unclassified", label: "미분류", color: "bg_gray" },
];

function ExpenseList({ transactions, summary, onCategoryChange }) {
  const totalCount = transactions.length;
  const classifiedCount = totalCount - summary.unclassified.count;
  const progressPercent = totalCount === 0 ? 0 : (classifiedCount / totalCount) * 100;

  return (
    <Wrapper>
      <ListHeader>
        <HeaderRow>
          <TitleGroup>
            <Title>전체 거래 내역</Title>
            <Count>{classifiedCount}/{totalCount}건 분류됨</Count>
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
          <ProgressFill style={{ width: `${progressPercent}%` }} />
        </ProgressTrack>
      </ListHeader>

      <CardGrid>
        {transactions.map((tx) => (
          <ExpenseListItem
            key={tx.id}
            transaction={tx}
            onCategoryChange={onCategoryChange}
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
  min-height: 0; /* 스크롤 체인 5단계 (최종) */
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px; /* TODO: design token화 */
  align-content: start; /* 카드 적을 때 위쪽부터 채우기 */
`;


const ProgressTrack = styled.div`
  width: 100%;
  height: 6px; /* TODO: design token화 */
  border-radius: 999px; /* 완전히 둥근 pill 형태 — theme에 대응 토큰 없음 */
  background-color: ${({ theme }) => theme.colors.bg_gray};
  overflow: hidden;
  margin-top: 8px; /* TODO: design token화 */
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: #5C3327; /* TODO: theme.js에 토큰 없음 — SideBar.jsx UserIcon과 동일 색상, 팀에 토큰화 제안 필요 */
  transition: width 0.2s ease;
`;

export default ExpenseList;