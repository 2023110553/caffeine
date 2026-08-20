import styled from "styled-components";

function AiPrescriptionSummary({ prescriptions, onDetailClick }) {
  return (
    <Card>
      <TopRow>
        <Title>⚡ AI 카페비서의 이번 달 경영 진단 &amp; 필수 액션 요약</Title>
        <DetailButton type="button" onClick={onDetailClick}>
          🔍 AI 심층 경영진단 보기
        </DetailButton>
      </TopRow>

      <List>
        {prescriptions.map((item) => (
          <ListItem key={item.id}>
            <ItemText>💡 {item.title}</ItemText>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px; /* TODO: design token화 */
  background-color: #f3eee6; /* TODO: theme.js에 없는 값 */
  border: 0.8px solid rgba(61, 37, 30, 0.08);
  border-radius: ${({ theme }) => theme.radius.large};
  padding: 18px 22px; /* TODO: design token화 */
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px; /* TODO: design token화 */
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 13px; /* TODO: design token화 */
  font-weight: 800;
  letter-spacing: -0.2px;
`;

const DetailButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px; /* TODO: design token화 */
  flex-shrink: 0;
  border: none;
  border-radius: 10px;
  background: #98582A; /* TODO: theme.js에 없는 값 */
  padding: 8px 16px; /* TODO: design token화 */
  color: #FDF9F3; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif; /* TODO: design token화 */
  font-size: 12px; /* TODO: design token화 */
  font-weight: 700;
  line-height: 18px; /* TODO: design token화 */
  text-align: center;
  cursor: pointer;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px; /* TODO: design token화 */
  list-style: none;
`;

const ListItem = styled.li`
  background-color: rgba(253, 249, 243, 0.65); /* TODO: theme.js에 없는 값 */
  border-radius: 10px;
  padding: 10px 14px; /* TODO: design token화 */
`;

const ItemText = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 12px; /* TODO: design token화 */
  font-weight: 500;
  line-height: 1.6;
`;

export default AiPrescriptionSummary;
