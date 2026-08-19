import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import MembershipCard from "./components/MembershipCard";
import BusinessInfoForm from "./components/BusinessInfoForm";
import Loading from "../../components/Loading";
import { useBusiness } from "../../contexts/BusinessContext";
import { getBusinessSettings, updateBusinessSettings, getSubscription, cancelSubscription } from "../../api/settings";
import { syncTaxType } from "../../api/businesses";

// industry_name, benefits(혜택 목록)는 API에 없는 필드 - UI 전용으로 유지
const INDUSTRY_NAME_PLACEHOLDER = "비알코올 음료점업 · 커피전문점";
const BENEFITS = [
  "AI 세무 챗봇 무제한 질의응답",
  "지출 자동 분류 및 실시간 부가세 예측",
  "세무사 전달용 클린 데이터 패키지 생성",
];

function SettingsPage() {
  const { business } = useBusiness();
  const [businessForm, setBusinessForm] = useState(null);
  const [membership, setMembership] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncingTaxType, setIsSyncingTaxType] = useState(false);

  const loadData = useCallback(async () => {
    const [businessRes, subscriptionRes] = await Promise.all([
      getBusinessSettings(business.businessId),
      getSubscription(business.businessId),
    ]);
    setBusinessForm({ ...businessRes.data.data, industry_name: INDUSTRY_NAME_PLACEHOLDER });
    setMembership({ ...subscriptionRes.data.data, benefits: BENEFITS });
  }, [business.businessId]);

  useEffect(() => {
    const load = async () => {
      await loadData();
      setIsLoading(false);
    };
    load();
  }, [loadData]);

  const handleChangeBusinessForm = (field, value) => {
    setBusinessForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveBusinessForm = async () => {
    // tax_type은 이 API로 수정 불가 - syncTaxType으로 별도 처리
    const { business_name, representative_name, business_number, industry_code } = businessForm;
    await updateBusinessSettings(business.businessId, {
      business_name,
      representative_name,
      business_number,
      industry_code,
    });
  };

  const handleSyncTaxType = async () => {
    setIsSyncingTaxType(true);
    try {
      await syncTaxType(business.businessId);
      await loadData();
    } finally {
      setIsSyncingTaxType(false);
    }
  };

  const handleChangePayment = () => {
    // TODO: 결제 수단 변경 플로우 연동 - payment_token 발급 방식(PG사 연동) 확인 필요
  };

  const handleCancelSubscription = async () => {
    // TODO: 취소 확인 UX(모달 등) 필요
    await cancelSubscription(business.businessId);
    await loadData();
  };

  if (isLoading) return <Loading />;
  if (!businessForm || !membership) return null;

  return (
    <Wrapper>
      <Header>
        <Title>설정</Title>
        <Subtitle>이용 멤버십 플랜 및 사업장 기본 정보를 관리합니다</Subtitle>
      </Header>

      <ColumnGrid>
        <MembershipCard
          membership={membership}
          onChangePayment={handleChangePayment}
          onCancelSubscription={handleCancelSubscription}
        />
        <BusinessInfoForm
          form={businessForm}
          onChange={handleChangeBusinessForm}
          onSubmit={handleSaveBusinessForm}
          onSyncTaxType={handleSyncTaxType}
          isSyncingTaxType={isSyncingTaxType}
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
  row-gap: 20px; /* TODO: design token화 */
  column-gap: 20px; /* TODO: design token화 */
  align-items: start;
  align-self: stretch;
  padding: 24px; /* 피그마 스펙 */
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

export default SettingsPage;
