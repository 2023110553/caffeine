import styled from "styled-components";
import Button from "../../../components/Button";
import chevronDownIcon from "../../../assets/chevronDownIcon.svg";

const TAX_TYPE_OPTIONS = [
  { value: "GENERAL", label: "일반과세자 (연 매출 1억 400만 원 이상 또는 선택)" },
  { value: "SIMPLIFIED", label: "간이과세자 (연 매출 1억 400만 원 미만 소상공인)" },
  { value: "EXEMPT", label: "면세사업자 (부가가치세 면제 품목 취급 사업자)" },
];

function BusinessInfoForm({ form, onChange, onSubmit }) {
  const { businessName, ownerName, businessNumber, taxType, industryCode, industryName } = form;

  return (
    <Card>
      <TitleGroup>
        <Title>사업장 기본 정보 설정</Title>
        <Description>세무 신고 및 장부 작성에 사용되는 기본 정보입니다</Description>
      </TitleGroup>

      <FormArea>
        <FieldGroup>
          <Label>상호명</Label>
          <FieldInput
            value={businessName}
            onChange={(e) => onChange("businessName", e.target.value)}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>대표자명</Label>
          <FieldInput
            value={ownerName}
            onChange={(e) => onChange("ownerName", e.target.value)}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>사업자등록번호</Label>
          <BusinessNumberInput
            value={businessNumber}
            onChange={(e) => onChange("businessNumber", e.target.value)}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>과세 유형</Label>
          <SelectWrapper>
            <Select
              value={taxType}
              onChange={(e) => onChange("taxType", e.target.value)}
            >
              {TAX_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <ChevronIcon src={chevronDownIcon} alt="" />
          </SelectWrapper>
        </FieldGroup>

        <FieldGroup>
          <Label>업종 코드</Label>
          <IndustryRow>
            <IndustryCodeInput
              value={industryCode}
              onChange={(e) => onChange("industryCode", e.target.value)}
            />
            <IndustryName>{industryName}</IndustryName>
          </IndustryRow>
        </FieldGroup>
      </FormArea>

      <ButtonWrapper>
        <SubmitButton variant="button_large_brown" size="large" onClick={onSubmit}>
          💾 설정 저장하기
        </SubmitButton>
      </ButtonWrapper>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.card_white};
  border: 0.8px solid #eae0d2; /* TODO: theme.js에 없는 값 */
  border-radius: ${({ theme }) => theme.radius.large};
  box-shadow: 0 1px 4px 0 rgba(61, 37, 30, 0.05);
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  padding: 20px 24px 16px 24px; /* 피그마 스펙 */
  border-bottom: 0.8px solid #f0e8da; /* TODO: theme.js에 없는 값 */
`;

const Title = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  min-height: 25.24px; /* MembershipCard StatusBadge 높이(17.25px line-height + 4px*2 padding)와 맞춤 */
  color: ${({ theme }) => theme.colors.txt_brown};
  font-family: var(--Font-familiy-Noto, "Noto Sans KR");
  font-size: 14.5px; /* TODO: design token화 */
  font-weight: 700;
  line-height: 21.75px; /* TODO: design token화 - 150% */
  letter-spacing: -0.145px; /* TODO: design token화 */
`;

const Description = styled.p`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 4px; /* TODO: design token화 */
  color: #a07860; /* TODO: theme.js에 없는 값 */
  font-family: var(--Font-familiy-Noto, "Noto Sans KR");
  font-size: 12px; /* TODO: design token화 */
  font-weight: 400;
  line-height: 18px; /* TODO: design token화 - 150% */
`;

const FormArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  height: 402.25px;
  padding: 18px 24px 0 24px; /* 피그마 스펙 */
  gap: 14px; /* TODO: design token화 */
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  padding-bottom: 7px; /* TODO: design token화 */
  color: #9e7060; /* TODO: theme.js에 없는 값 */
  font-family: var(--Font-familiy-Noto, "Noto Sans KR");
  font-size: 11.5px; /* TODO: design token화 */
  font-weight: 500;
  line-height: 17.25px; /* TODO: design token화 - 150% */
  letter-spacing: 0.287px; /* TODO: design token화 */
`;

const FieldInput = styled.input`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
  width: 100%;
  height: 41.85px;
  padding: 10px 13px; /* TODO: design token화 */
  border-radius: 10px; /* TODO: theme.js에 없는 값 (기존 radius 토큰과 불일치) */
  border: 0.8px solid #e8ddd0; /* TODO: theme.js에 없는 값 */
  background-color: #faf6f0; /* TODO: theme.js에 없는 값 */
  color: ${({ theme }) => theme.colors.txt_brown};
  font-family: var(--Font-familiy-Noto, "Noto Sans KR");
  font-size: 13.5px; /* TODO: design token화 */
  font-weight: 400;
  line-height: 20.25px; /* TODO: design token화 - 150% */
`;

const BusinessNumberInput = styled(FieldInput)`
  height: 41.1px;
  font-family: "JetBrains Mono", monospace;
  font-size: 13px; /* TODO: design token화 */
  line-height: 19.5px; /* TODO: design token화 - 150% */
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Select = styled.select`
  display: flex;
  align-items: center;
  width: 100%;
  height: 41.85px;
  padding: 10.8px 38.8px 10.8px 13.8px; /* TODO: design token화 */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border-radius: 10px; /* TODO: theme.js에 없는 값 (기존 radius 토큰과 불일치) */
  border: 0.8px solid #e8ddd0; /* TODO: theme.js에 없는 값 */
  background-color: #faf6f0; /* TODO: theme.js에 없는 값 */
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 13.5px; /* TODO: design token화 */
  font-weight: 400;
  line-height: 20.25px; /* TODO: design token화 - 150% */
`;

const ChevronIcon = styled.img`
  position: absolute;
  top: 50%;
  right: 13.8px;
  transform: translateY(-50%);
  width: 9px;
  height: 5px;
  pointer-events: none;
`;

const IndustryRow = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 10px; /* TODO: design token화 */
`;

const IndustryCodeInput = styled.input`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  width: 100px; /* TODO: design token화 */
  height: 41.1px;
  padding: 10px 13px; /* TODO: design token화 */
  border-radius: 10px; /* TODO: theme.js에 없는 값 (기존 radius 토큰과 불일치) */
  border: 0.8px solid #e8ddd0; /* TODO: theme.js에 없는 값 */
  background-color: #f3ede3; /* TODO: theme.js에 없는 값 */
  color: ${({ theme }) => theme.colors.txt_brown};
  font-family: "JetBrains Mono", monospace;
  font-size: 13px; /* TODO: design token화 */
  font-weight: 400;
  line-height: 19.5px; /* TODO: design token화 - 150% */
`;

const IndustryName = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 13px; /* TODO: design token화 */
  border: 0.8px solid #e8ddd0; /* TODO: theme.js에 없는 값 */
  border-radius: 10px; /* TODO: theme.js에 없는 값 (기존 radius 토큰과 불일치) */
  background-color: #f3ede3; /* TODO: theme.js에 없는 값 */
  color: #6b3d30; /* TODO: theme.js에 없는 값 */
  font-family: var(--Font-familiy-Noto, "Noto Sans KR");
  font-size: 12.5px; /* TODO: design token화 */
  font-weight: 400;
  line-height: 17.5px; /* TODO: design token화 - 140% */
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  padding: 20px 24px 22px 24px; /* 피그마 스펙 */
`;

const SubmitButton = styled(Button)`
  display: flex;
  width: 100%;
  padding: 13px 20px; /* TODO: design token화 */
  gap: 8px; /* TODO: design token화 */
`;

export default BusinessInfoForm;
