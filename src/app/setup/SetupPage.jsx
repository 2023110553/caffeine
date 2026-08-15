import { useState } from "react";
import styled from "styled-components";
import MembershipCard from "./components/MembershipCard";
import BusinessInfoForm from "./components/BusinessInfoForm";

// TODO: 백엔드 연동 시 구독/결제 조회 API 응답으로 교체
const MOCK_MEMBERSHIP = {
  planName: "카페비서 Pro",
  price: 19900,
  billingDate: "매월 25일",
  nextBillingDate: "2026.08.25",
  dDay: 10,
  paymentMethod: "국민카드 (9412) · 자동 갱신",
  benefits: [
    "AI 세무 챗봇 무제한 질의응답",
    "지출 자동 분류 및 실시간 부가세 예측",
    "세무사 전달용 클린 데이터 패키지 생성",
  ],
};

// TODO: 백엔드 연동 시 사업장 정보 조회 API 응답으로 교체
const MOCK_BUSINESS_FORM = {
  businessName: "카페비서 성수점",
  ownerName: "유지은",
  businessNumber: "123-45-67890",
  taxType: "GENERAL",
  industryCode: "552301",
  industryName: "비알코올 음료점업 · 커피전문점",
};

function SetupPage() {
  const [businessForm, setBusinessForm] = useState(MOCK_BUSINESS_FORM);

  const handleChangeBusinessForm = (field, value) => {
    setBusinessForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveBusinessForm = () => {
    // TODO: 사업장 정보 저장 API 연동
  };

  const handleChangePayment = () => {
    // TODO: 결제 수단 변경 플로우 연동
  };

  const handleCancelSubscription = () => {
    // TODO: 구독 취소 플로우 연동
  };

  return (
    <Wrapper>
      <Header>
        <Title>설정</Title>
        <Subtitle>이용 멤버십 플랜 및 사업장 기본 정보를 관리합니다</Subtitle>
      </Header>

      <ColumnGrid>
        <MembershipCard
          membership={MOCK_MEMBERSHIP}
          onChangePayment={handleChangePayment}
          onCancelSubscription={handleCancelSubscription}
        />
        <BusinessInfoForm
          form={businessForm}
          onChange={handleChangeBusinessForm}
          onSubmit={handleSaveBusinessForm}
        />
      </ColumnGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  padding: 26px 28px 20px 28px;
  border-bottom: 0.8px solid #eae0d2; /* theme.js에 없는 값 */
  background: var(--primary-brand-primary-100, #fdf9f3); /* theme.js에 없는 값 */
`;

const ColumnGrid = styled.div`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px; /* TODO: design token화 */
  align-items: start;
  padding: 20px 28px 28px; /* TODO: design token화 */
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-family: var(--Font-familiy-Noto, "Noto Sans KR");
  font-size: 22px; /* TODO: design token화 */
  font-style: normal;
  font-weight: 700;
  line-height: 33px; /* 150% */
  letter-spacing: -0.44px;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.txt_beige};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  padding-top: 4px;

  font-family: var(--Font-familiy-Noto, "Noto Sans KR");
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.5px; /* 150% */
`;

export default SetupPage;
