import { useState } from "react";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import {
  Content,
  Description,
  Divider,
  FormArea,
  FieldGroup,
  FieldLabel,
  Required,
  TypeCardList,
  TypeCard,
  Radio,
  RadioDot,
  TypeContent,
  TypeCardLabel,
  TypeCardDesc,
  TwoColumn,
  InputBox,
  HelperText,
  ResidentArea,
  ResidentLabel,
  OptionalBadge,
  ButtonRow,
  InsuranceOption,
  CheckBox,
  InsuranceContent,
  InsuranceTitle,
  InsuranceDesc,
  InsuranceIncluded,
  SmallCheck,
} from "./AddEmployeeModal.styles";

const EMPLOYMENT_TYPES = [
  {
    value: "FULL_TIME",
    label: "4대보험 정직원",
    desc: "국민연금·건강·고용·산재보험 가입",
  },
  {
    value: "PART_TIME",
    label: "단시간 근로자 (주 15시간 미만)",
    desc: "4대보험 중 일부 적용 제외, 주휴수당 없음",
  },
  {
    value: "FREELANCER",
    label: "3.3% 프리랜서",
    desc: "사업소득세 3.3% 원천징수",
  },
];

const INITIAL_FORM = {
  name: "",
  employment_type: "FULL_TIME",
  hourly_wage: 10320,
  monthly_contracted_hours: "",
  work_started_at: "", // TODO: 폼에 입사일 입력 필드(date input) 추가 필요 - 현재 UI엔 없음
  resident_id_front: "", // TODO: employees 응답에 필드가 없음 - 서버가 저장/사용하는지 백엔드 확인 필요
  is_employment_insured: false,
};

function AddEmployeeModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(INITIAL_FORM);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isValid = form.name.trim() && form.hourly_wage && form.monthly_contracted_hours;

  const handleSubmit = () => {
    if (!isValid) return;

    onSubmit({
      name: form.name,
      employment_type: form.employment_type,
      hourly_wage: form.hourly_wage,
      monthly_contracted_hours: form.monthly_contracted_hours,
      work_started_at: form.work_started_at || new Date().toISOString().slice(0, 10),
      is_long_term_contract: form.is_employment_insured,
    });

    setForm(INITIAL_FORM);
  };

  return (
    <Modal open={open} onClose={onClose} title="신규 직원 등록">
      <Content>
        <Description>
          직원 정보와 고용 형태를 입력하면 세금 및 보험료가 자동 계산됩니다.
        </Description>

        <Divider />

        <FormArea>
          <Input
            label="직원 성명"
            required
            placeholder="예: 홍길동"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <FieldGroup>
            <FieldLabel>
              고용 형태 선택 <Required>*</Required>
            </FieldLabel>

            <TypeCardList>
              {EMPLOYMENT_TYPES.map((type) => {
                const selected = form.employment_type === type.value;

                return (
                  <TypeCard
                    key={type.value}
                    type="button"
                    $selected={selected}
                    onClick={() => handleChange("employment_type", type.value)}
                  >
                    <Radio $selected={selected}>{selected && <RadioDot />}</Radio>

                    <TypeContent>
                      <TypeCardLabel $selected={selected}>{type.label}</TypeCardLabel>

                      <TypeCardDesc $selected={selected}>{type.desc}</TypeCardDesc>
                    </TypeContent>
                  </TypeCard>
                );
              })}
            </TypeCardList>
          </FieldGroup>
          {form.employment_type === "PART_TIME" && (
            <InsuranceOption
              type="button"
              $checked={form.is_employment_insured}
              onClick={() => handleChange("is_employment_insured", !form.is_employment_insured)}
            >
              <CheckBox $checked={form.is_employment_insured}>
                {form.is_employment_insured && "✓"}
              </CheckBox>

              <InsuranceContent>
                <InsuranceTitle $checked={form.is_employment_insured}>
                  근로계약 기간 3개월 이상 (고용보험 적용 대상)
                </InsuranceTitle>

                <InsuranceDesc $checked={form.is_employment_insured}>
                  근로계약서 상 계약기간이 3개월 이상(또는 기간의 정함이 없는 경우)이면 고용보험
                  가입 대상입니다.
                </InsuranceDesc>

                {form.is_employment_insured && (
                  <InsuranceIncluded>
                    <SmallCheck>✓</SmallCheck>
                    고용보험료가 급여 계산에 포함됩니다.
                  </InsuranceIncluded>
                )}
              </InsuranceContent>
            </InsuranceOption>
          )}

          <TwoColumn>
            <InputBox>
              <Input
                label="약정 시급"
                required
                type="number"
                unit="원"
                value={form.hourly_wage}
                onChange={(e) => handleChange("hourly_wage", Number(e.target.value))}
              />

              <HelperText>2026년 최저시급 10,320원</HelperText>
            </InputBox>

            <InputBox>
              <Input
                label="월 약정 근무시간"
                required
                type="number"
                unit="시간"
                placeholder="예: 209"
                value={form.monthly_contracted_hours}
                onChange={(e) => handleChange("monthly_contracted_hours", Number(e.target.value))}
              />

              <HelperText>주 40시간 기준 월 209시간</HelperText>
            </InputBox>
          </TwoColumn>

          <ResidentArea>
            <ResidentLabel>
              주민등록번호 앞자리
              <OptionalBadge>선택</OptionalBadge>
            </ResidentLabel>

            <Input
              placeholder="990101-1******"
              value={form.resident_id_front}
              onChange={(e) => handleChange("resident_id_front", e.target.value)}
            />

            <HelperText>간이세액표 적용 시 필요합니다. 저장 후 암호화됩니다.</HelperText>
          </ResidentArea>
        </FormArea>

        <Divider />

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
            ＋ 직원 등록 완료하기
          </Button>
        </ButtonRow>
      </Content>
    </Modal>
  );
}

export default AddEmployeeModal;
