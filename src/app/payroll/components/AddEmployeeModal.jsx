import { useState } from "react";
import styled from "styled-components";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const EMPLOYMENT_TYPES = [
  { value: "regular", label: "4대보험 정직원", desc: "국민연금·건강·고용·산재보험 가입" },
  { value: "parttime", label: "단시간 근로자 (주 15시간 미만)", desc: "4대보험 적용 제외, 주휴수당 없음" },
  { value: "freelancer", label: "3.3% 프리랜서", desc: "사업소득세 3.3% 원천징수" },
];

const INITIAL_FORM = {
  name: "",
  employmentType: "regular",
  hourlyWage: 10320, // 2026년 최저시급
  monthlyHours: "",
  residentIdFront: "",
};

function AddEmployeeModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(INITIAL_FORM);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = form.name.trim() && form.hourlyWage && form.monthlyHours;

  const handleSubmit = () => {
    if (!isValid) return;

    // 프리랜서는 고정세율(3.3%)로 등록 시점 값 계산, 그 외는 백엔드 계산 대기
    const withholdingTax =
      form.employmentType === "freelancer"
        ? Math.round(form.hourlyWage * form.monthlyHours * 0.033)
        : 0; // TODO: 정직원/단시간 근로자 - withholding-tax/calculate API 연동 필요

    onSubmit({
      name: form.name,
      employmentType: form.employmentType,
      hourlyWage: form.hourlyWage,
      monthlyHours: form.monthlyHours,
      withholdingTax,
      withholdingNote: form.employmentType === "freelancer" ? "3.3%" : null,
    });
    setForm(INITIAL_FORM);
  };

  return (
    <Modal open={open} onClose={onClose} title="신규 직원 등록">
      <Description>
        직원 정보와 고용 형태를 입력하면 세금 및 보험료가 자동 계산됩니다.
      </Description>

      <Input
        label="직원 성명 *"
        placeholder="예: 홍길동"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <FieldGroup>
        <FieldLabel>고용 형태 선택 *</FieldLabel>
        <TypeCardList>
          {EMPLOYMENT_TYPES.map((type) => (
            <TypeCard
              key={type.value}
              type="button"
              $selected={form.employmentType === type.value}
              onClick={() => handleChange("employmentType", type.value)}
            >
              <TypeCardLabel>{type.label}</TypeCardLabel>
              <TypeCardDesc>{type.desc}</TypeCardDesc>
            </TypeCard>
          ))}
        </TypeCardList>
      </FieldGroup>

      <Input
        label="약정 시급 *"
        type="number"
        unit="원"
        value={form.hourlyWage}
        onChange={(e) => handleChange("hourlyWage", Number(e.target.value))}
      />
      <HelperText>2026년 최저시급 10,320원</HelperText>

      <Input
        label="월 약정 근무시간 *"
        type="number"
        unit="시간"
        placeholder="예: 209"
        value={form.monthlyHours}
        onChange={(e) => handleChange("monthlyHours", Number(e.target.value))}
      />
      <HelperText>주 40시간 기준 월 209시간</HelperText>

      <Input
        label="주민등록번호 앞자리 (선택)"
        placeholder="990101-1******"
        value={form.residentIdFront}
        onChange={(e) => handleChange("residentIdFront", e.target.value)}
      />
      <HelperText>간이세액표 적용 시 필요합니다. 저장 후 암호화됩니다.</HelperText>

      <ButtonRow>
        <Button variant="unchecked_button" size="large" onClick={onClose}>
          취소
        </Button>
        <Button
          variant="button_large_brown"
          size="large"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          직원 등록 완료하기
        </Button>
      </ButtonRow>
    </Modal>
  );
}

const Description = styled.p`
  color: ${({ theme }) => theme.colors.txt_beige};
  font-size: 14px; /* TODO: design token화 */
  margin-bottom: 20px; /* TODO: design token화 */
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; /* TODO: design token화 */
  margin: 16px 0; /* TODO: design token화 */
`;

const FieldLabel = styled.p`
  font-size: 14px; /* TODO: design token화 */
  color: ${({ theme }) => theme.colors.txt_beige};
`;

const TypeCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; /* TODO: design token화 */
`;

const TypeCard = styled.button`
  text-align: left;
  border: 1px solid
    ${({ theme, $selected }) => ($selected ? theme.colors.bg_brown : theme.colors.bg_gray)};
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.bg_beige : theme.colors.bg_white};
  border-radius: ${({ theme }) => theme.radius.medium_large};
  padding: 12px 16px; /* TODO: design token화 */
  cursor: pointer;
`;

const TypeCardLabel = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-weight: 600;
  font-size: 14px; /* TODO: design token화 */
`;

const TypeCardDesc = styled.p`
  color: ${({ theme }) => theme.colors.txt_beige};
  font-size: 12px; /* TODO: design token화 */
  margin-top: 2px; /* TODO: design token화 */
`;

const HelperText = styled.p`
  color: ${({ theme }) => theme.colors.txt_beige};
  font-size: 12px; /* TODO: design token화 */
  margin: 4px 0 16px; /* TODO: design token화 */
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px; /* TODO: design token화 */
  margin-top: 12px; /* TODO: design token화 */

  button {
    flex: 1;
  }
`;

export default AddEmployeeModal;