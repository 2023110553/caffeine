import Button from "../../../components/Button";
import lightningIcon from "../../../assets/lightningIcon.svg";
import cardIcon from "../../../assets/cardIcon.svg";
import checkCircleIcon from "../../../assets/checkCircleIcon.svg";
import {
  Card,
  CardHeader,
  TitleRow,
  Title,
  Description,
  StatusBadge,
  StatusDot,
  StatusBanner,
  CardBody,
  PlanBox,
  PlanRow,
  DividerWrapper,
  Divider,
  PlanGroup,
  PlanBadgeWrapper,
  LightningIcon,
  CardIcon,
  CheckIconWrapper,
  CheckIcon,
  PlanBadge,
  PriceGroup,
  Price,
  PlanName,
  InfoList,
  InfoRow,
  InfoLabel,
  InfoValue,
  DateValue,
  PaymentMethodText,
  DDayBadge,
  BenefitList,
  BenefitItem,
  BenefitText,
  ButtonRow,
} from "./MembershipCard.styles";

const STATUS_META = {
  ACTIVE: { color: "#059669", bg: "#ecfdf5", label: "구독 이용 중" },
  PAST_DUE: { color: "#dc2626", bg: "#fef2f2", label: "결제 실패" },
  CANCELLED: { color: "#b45309", bg: "#fef3c7", label: "해지 예정" },
  EXPIRED: { color: "#6b7280", bg: "#f3f4f6", label: "이용 종료" },
};

function MembershipCard({ membership, onChangePayment, onCancelSubscription }) {
  const {
    plan_display_name,
    price,
    next_billing_date,
    days_until_billing,
    card_company,
    card_last4,
    benefits,
    status,
    status_display,
    access_until,
    last_payment_error,
  } = membership;
  const paymentMethodText =
    card_company && card_last4
      ? `${card_company} (${card_last4}) · 자동 갱신`
      : "등록된 결제 수단 없음";
  const statusMeta = STATUS_META[status] ?? {
    color: "#059669",
    bg: "#ecfdf5",
    label: status_display,
  };
  const canCancel = status === "ACTIVE" || status === "PAST_DUE";

  return (
    <Card>
      <CardHeader>
        <TitleRow>
          <Title>이용 플랜 및 멤버십</Title>
          <StatusBadge $color={statusMeta.color} $bg={statusMeta.bg}>
            <StatusDot $color={statusMeta.color} />
            {statusMeta.label}
          </StatusBadge>
        </TitleRow>
        <Description>현재 이용 중인 구독 요금제와 결제 정보를 관리합니다</Description>

        {status === "PAST_DUE" && (
          <StatusBanner $tone="danger">
            ⚠️ 정기 결제에 실패했어요{last_payment_error ? ` (${last_payment_error})` : ""}. 결제
            수단을 갱신해주세요.
          </StatusBanner>
        )}
        {status === "CANCELLED" && access_until && (
          <StatusBanner $tone="notice">
            {access_until}까지는 지금처럼 계속 이용할 수 있어요. 이후 자동으로 서비스 이용이
            종료됩니다.
          </StatusBanner>
        )}
        {status === "EXPIRED" && (
          <StatusBanner $tone="muted">
            구독이 종료됐어요. 다시 이용하려면 결제 수단을 등록해주세요.
          </StatusBanner>
        )}
      </CardHeader>

      <CardBody>
        <PlanBox>
          <PlanRow>
            <PlanGroup>
              <PlanBadgeWrapper>
                <PlanBadge>
                  <LightningIcon src={lightningIcon} alt="" />
                  PRO
                </PlanBadge>
              </PlanBadgeWrapper>
              <PlanName>{plan_display_name}</PlanName>
            </PlanGroup>
            <PriceGroup>
              <Price>월 {price.toLocaleString()}원</Price>
            </PriceGroup>
          </PlanRow>

          <DividerWrapper>
            <Divider />
          </DividerWrapper>

          <InfoList>
            <InfoRow>
              <InfoLabel>다음 결제 예정일</InfoLabel>
              <InfoValue>
                <DateValue>{next_billing_date}</DateValue>
                <DDayBadge>{days_until_billing}일 남음</DDayBadge>
              </InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>결제 수단</InfoLabel>
              <InfoValue>
                <CardIcon src={cardIcon} alt="" />
                <PaymentMethodText>{paymentMethodText}</PaymentMethodText>
              </InfoValue>
            </InfoRow>
          </InfoList>

          <DividerWrapper>
            <Divider />
          </DividerWrapper>

          <BenefitList>
            {benefits.map((benefit) => (
              <BenefitItem key={benefit}>
                <CheckIconWrapper>
                  <CheckIcon src={checkCircleIcon} alt="" />
                </CheckIconWrapper>
                <BenefitText>{benefit}</BenefitText>
              </BenefitItem>
            ))}
          </BenefitList>
        </PlanBox>

        <ButtonRow>
          <Button variant="unchecked_button" onClick={onChangePayment}>
            💳 결제 수단 변경
          </Button>
          {canCancel && (
            <Button variant="unchecked_button" onClick={onCancelSubscription}>
              구독 취소
            </Button>
          )}
        </ButtonRow>
      </CardBody>
    </Card>
  );
}

export default MembershipCard;
