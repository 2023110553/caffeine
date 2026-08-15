import styled from "styled-components";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const TAX_TYPE_OPTIONS = [
  { value: "GENERAL", label: "일반과세자" },
  { value: "SIMPLIFIED", label: "간이과세자" },
  { value: "EXEMPT", label: "면세사업자" },
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
        <Input
          label="상호명"
          value={businessName}
          onChange={(e) => onChange("businessName", e.target.value)}
        />

        <Input
          label="대표자명"
          value={ownerName}
          onChange={(e) => onChange("ownerName", e.target.value)}
        />

        <Input
          label="사업자등록번호"
          value={businessNumber}
          onChange={(e) => onChange("businessNumber", e.target.value)}
        />

        <FieldGroup>
          <Label>과세 유형</Label>
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

      <Button variant="button_large_brown" size="large" onClick={onSubmit}>
        💾 설정 저장하기
      </Button>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* TODO: design token화 */
  background-color: ${({ theme }) => theme.colors.card_white};
  border: 0.8px solid #eae0d2; /* TODO: theme.js에 없는 값 */
  border-radius: ${({ theme }) => theme.radius.large};
  padding: 20px; /* TODO: design token화 */
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

const FormArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px; /* TODO: design token화 */
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px; /* TODO: design token화 - Input 컴포넌트와 간격 통일 */
`;

const Label = styled.label`
  font-size: 12.5px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: -0.125px;
  color: ${({ theme }) => theme.colors.txt_brown};
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 12px; /* TODO: design token화 - Input 컴포넌트와 동일 */
  border-radius: ${({ theme }) => theme.radius.small};
  border: 1px solid ${({ theme }) => theme.colors.bg_gray};
  background-color: ${({ theme }) => theme.colors.bg_white};
  color: ${({ theme }) => theme.colors.txt_brown};
`;

const IndustryRow = styled.div`
  display: flex;
  gap: 8px; /* TODO: design token화 */
`;

const IndustryCodeInput = styled.input`
  flex-shrink: 0;
  width: 100px; /* TODO: design token화 */
  padding: 8px 12px; /* TODO: design token화 - Input 컴포넌트와 동일 */
  border-radius: ${({ theme }) => theme.radius.small};
  border: 1px solid ${({ theme }) => theme.colors.bg_gray};
  background-color: ${({ theme }) => theme.colors.bg_white};
  color: ${({ theme }) => theme.colors.txt_brown};
`;

const IndustryName = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 8px 12px; /* TODO: design token화 */
  border-radius: ${({ theme }) => theme.radius.small};
  background-color: ${({ theme }) => theme.colors.bg_gray};
  color: ${({ theme }) => theme.colors.txt_beige};
  font-size: 13px; /* TODO: design token화 */
`;

export default BusinessInfoForm;
