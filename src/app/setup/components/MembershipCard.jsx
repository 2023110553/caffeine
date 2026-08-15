import styled from "styled-components";
import Button from "../../../components/Button";

function MembershipCard({ membership, onChangePayment, onCancelSubscription }) {
  const { planName, price, billingDate, nextBillingDate, dDay, paymentMethod, benefits } = membership;

  return (
    <Card>
      <CardHeader>
        <TitleGroup>
          <Title>이용 플랜 및 멤버십</Title>
          <Description>현재 이용 중인 구독 요금제와 결제 정보를 관리합니다</Description>
        </TitleGroup>
        <StatusBadge>● 구독 이용 중</StatusBadge>
      </CardHeader>

      <PlanBox>
        <PlanRow>
          <PlanBadge>⚡ PRO</PlanBadge>
          <PriceGroup>
            <Price>월 {price.toLocaleString()}원</Price>
            <PriceNote>{billingDate} 자동결제</PriceNote>
          </PriceGroup>
        </PlanRow>
        <PlanName>{planName}</PlanName>

        <InfoList>
          <InfoRow>
            <InfoLabel>다음 결제 예정일</InfoLabel>
            <InfoValue>
              {nextBillingDate} <DDayBadge>{dDay}일 남음</DDayBadge>
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>결제 수단</InfoLabel>
            <InfoValue>💳 {paymentMethod}</InfoValue>
          </InfoRow>
        </InfoList>

        <BenefitList>
          {benefits.map((benefit) => (
            <BenefitItem key={benefit}>✓ {benefit}</BenefitItem>
          ))}
        </BenefitList>
      </PlanBox>

      <ButtonRow>
        <Button variant="unchecked_button" onClick={onChangePayment}>
          💳  결제 수단 변경
        </Button>
        <Button variant="unchecked_button" onClick={onCancelSubscription}>
          구독 취소
        </Button>
      </ButtonRow>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px; /* TODO: design token화 */
  background-color: ${({ theme }) => theme.colors.card_white};
  border: 0.8px solid #eae0d2; /* TODO: theme.js에 없는 값 */
  border-radius: ${({ theme }) => theme.radius.large};
  padding: 20px; /* TODO: design token화 */
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px; /* TODO: design token화 */
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 16px; /* TODO: design token화 */
  font-weight: 700;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.txt_beige};
  font-size: 12px; /* TODO: design token화 */
`;

const StatusBadge = styled.span`
  flex-shrink: 0;
  background-color: #eaf6ee; /* TODO: theme.js에 없는 값 */
  color: #2a6347; /* TODO: theme.js에 없는 값 */
  border-radius: 999px;
  padding: 4px 10px; /* TODO: design token화 */
  font-size: 11px; /* TODO: design token화 */
  font-weight: 600;
`;

const PlanBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.bg_gray};
  border-radius: ${({ theme }) => theme.radius.medium_large};
  padding: 18px; /* TODO: design token화 */
`;

const PlanRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const PlanBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.bg_brown};
  color: ${({ theme }) => theme.colors.txt_white};
  border-radius: ${({ theme }) => theme.radius.small};
  padding: 3px 8px; /* TODO: design token화 */
  font-size: 11px; /* TODO: design token화 */
  font-weight: 700;
`;

const PriceGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Price = styled.span`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 18px; /* TODO: design token화 */
  font-weight: 800;
`;

const PriceNote = styled.span`
  color: ${({ theme }) => theme.colors.txt_beige};
  font-size: 11px; /* TODO: design token화 */
`;

const PlanName = styled.p`
  margin-top: 6px; /* TODO: design token화 */
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 17px; /* TODO: design token화 */
  font-weight: 700;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* TODO: design token화 */
  margin-top: 16px; /* TODO: design token화 */
  padding-top: 16px; /* TODO: design token화 */
  border-top: 0.8px solid #e0d5c5; /* TODO: theme.js에 없는 값 */
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoLabel = styled.span`
  color: ${({ theme }) => theme.colors.txt_beige};
  font-size: 12.5px; /* TODO: design token화 */
`;

const InfoValue = styled.span`
  display: flex;
  align-items: center;
  gap: 6px; /* TODO: design token화 */
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 12.5px; /* TODO: design token화 */
  font-weight: 600;
`;

const DDayBadge = styled.span`
  background-color: #fef6ec; /* TODO: theme.js에 없는 값 */
  color: #b45309; /* TODO: theme.js에 없는 값 */
  border-radius: 999px;
  padding: 2px 8px; /* TODO: design token화 */
  font-size: 11px; /* TODO: design token화 */
  font-weight: 600;
`;

const BenefitList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; /* TODO: design token화 */
  margin-top: 16px; /* TODO: design token화 */
  padding-top: 16px; /* TODO: design token화 */
  border-top: 0.8px solid #e0d5c5; /* TODO: theme.js에 없는 값 */
`;

const BenefitItem = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 12.5px; /* TODO: design token화 */
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 8px; /* TODO: design token화 */

  > button {
    flex: 1;
    width: auto;
  }
`;

export default MembershipCard;
