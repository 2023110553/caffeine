import styled from "styled-components";
import expenseIcon from "../../../assets/coffee.png";

function ExpenseSummaryBanner({ unclassifiedCount, estimatedDeduction }) {
  return (
    <Wrapper>
      <Left>
        <IconCircle>
          <img src={expenseIcon} alt="지출 아이콘" />
        </IconCircle>
        <TextGroup>
          <Title>
            지출을 분류하고 <span style={{ color: "#C9A882" }}>부가세 공제</span>{" "}
            혜택을 받으세요
          </Title>
          <Subtitle>지출을 분류할수록 절세 금액이 늘어납니다</Subtitle>
        </TextGroup>
      </Left>
      <Right>
        <Stat>
          <StatLabel>남은 미분류</StatLabel>
          <StatValue>{unclassifiedCount}건</StatValue>
        </Stat>
        <Divider />
        <Stat>
          <StatLabel>예상 공제 가능액</StatLabel>
          <StatValue>{estimatedDeduction.toLocaleString()}원</StatValue>
        </Stat>
      </Right>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #3d251e 0%, #5c3327 60%, #7a4535 100%);
  border-radius: ${({ theme }) => theme.radius.large};
  padding: 16px 24px; /* TODO: design token화 */
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
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
  width: 273px;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.p`
  color: #fdf9f3;
  font-family: Outfit, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
`;

const Subtitle = styled.p`
  color: rgba(201, 168, 130, 0.8);
  font-family: Outfit, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const StatLabel = styled.p`
  color: #c9a882;
  text-align: center;
  font-family: Outfit, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
`;

const StatValue = styled.p`
  color: #fdf9f3;
  text-align: center;
  font-family: Outfit, sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
`;

const Divider = styled.div`
  width: 1px;
  height: 40px;
  background: rgba(201, 168, 130, 0.3);
`;

export default ExpenseSummaryBanner;