import styled from "styled-components";
import expenseIcon from "../../../assets/coffee.png"; 

function ExpenseSummaryBanner({ unclassifiedCount, estimatedDeduction }) {
  return (
    <Wrapper>
      <Left>
        <IconCircle>
            <img src={expenseIcon} alt="" />
        </IconCircle>
        <TextGroup>
          <Title>지출을 분류하고 부가세 공제 혜택을 받으세요</Title>
          <Subtitle>지출을 분류할수록 절세 금액이 늘어납니다</Subtitle>
        </TextGroup>
      </Left>
      <Right>
        <Stat>
          <StatLabel>남은 미분류</StatLabel>
          <StatValue>{unclassifiedCount}건</StatValue>
        </Stat>
        <Stat>
          <StatLabel>예상 공제 가능액</StatLabel>
          <StatValue>{estimatedDeduction.toLocaleString()}원</StatValue>
        </Stat>
      </Right>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex-shrink: 0; /* 고정 영역 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px; /* TODO: design token화 */
  background-color: ${({ theme }) => theme.colors.bg_beige};
  border-radius: ${({ theme }) => theme.radius.large};
  padding: 16px 24px; /* TODO: design token화 */
  margin-bottom: 16px; /* TODO: design token화 */
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px; /* TODO: design token화 */
`;

const IconCircle = styled.div`
  width: 40px; /* TODO: design token화 */
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.medium};
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px; /* TODO: design token화 */
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-weight: 700;
  font-size: 14px; /* TODO: design token화 */
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  opacity: 0.7;
  font-size: 12px; /* TODO: design token화 */
`;

const Right = styled.div`
  display: flex;
  gap: 24px; /* TODO: design token화 */
  flex-shrink: 0;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px; /* TODO: design token화 */
  text-align: right;
`;

const StatLabel = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  opacity: 0.7;
  font-size: 12px; /* TODO: design token화 */
`;

const StatValue = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-weight: 700;
  font-size: 16px; /* TODO: design token화 */
`;

export default ExpenseSummaryBanner;