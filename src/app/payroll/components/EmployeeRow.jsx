import { useState } from "react";
import Input from "../../../components/Input";
import DeleteConfirmModal from "./DeleteConfirmModal";
import {
  Card,
  NameArea,
  DeleteButton,
  Avatar,
  NameGroup,
  Name,
  EmployeeNumber,
  TypeArea,
  TypeSelect,
  HoursArea,
  WageArea,
  GrossPayArea,
  FieldLabel,
  GrossPay,
  DetailButtonArea,
  DetailButton,
  TaxArea,
  TaxValue,
  TaxNote,
} from "./EmployeeRow.styles";

const EMPLOYMENT_TYPE_LABEL = {
  FULL_TIME: "4대보험 정직원",
  PART_TIME: "단시간 근로자 (주 15시간 미만)",
  FREELANCER: "3.3% 프리랜서",
};

const DETAIL_BUTTON_LABEL = {
  FULL_TIME: "임금명세서 상세",
  PART_TIME: "임금명세서 상세",
  FREELANCER: "지급내역서 상세",
};

// FREELANCER는 세법상 3.3% 고정, PART_TIME/FULL_TIME은 간이세액표 기준이라 급여에 따라 달라짐 - 서버 값으로 실효세율 역산
function getWithholdingNote(employmentType, grossPay, withholdingTax) {
  if (employmentType === "FREELANCER") return "3.3%";
  if (employmentType === "PART_TIME" && grossPay > 0) {
    return `${((withholdingTax / grossPay) * 100).toFixed(1)}%`;
  }
  return null;
}

function EmployeeRow({ employee, onUpdate, onViewPayslip, onDelete }) {
  const {
    employee_id,
    name,
    employment_type,
    hourly_wage,
    monthly_contracted_hours,
    grossPay,
    withholdingTax,
    paymentId,
  } = employee;
  const hasTaxOwed = withholdingTax > 0;
  const withholdingNote = getWithholdingNote(employment_type, grossPay, withholdingTax);

  // 실제로는 완전 삭제가 아니라 퇴사 처리(soft delete) - status만 INACTIVE로 바뀌고 목록에서만 숨겨짐.
  // 브라우저 기본 window.confirm 대신 피그마에 디자인된 확인 모달(DeleteConfirmModal)을 사용한다.
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleConfirmDelete = async () => {
    await onDelete(employee_id);
  };

  // 타이핑 중엔 문자열 그대로 보여주고(빈 값·선행 0 자유롭게 편집), blur 시에만 숫자로 변환해 저장
  // prop이 바뀌면(서버 재조회 등) 렌더링 중 비교해서 로컬 입력값을 리셋 - effect 대신 렌더 중 조정 패턴 사용
  const [hoursInput, setHoursInput] = useState(String(monthly_contracted_hours ?? ""));
  const [prevHours, setPrevHours] = useState(monthly_contracted_hours);
  if (monthly_contracted_hours !== prevHours) {
    setPrevHours(monthly_contracted_hours);
    setHoursInput(String(monthly_contracted_hours ?? ""));
  }

  const [wageInput, setWageInput] = useState(String(hourly_wage ?? ""));
  const [prevWage, setPrevWage] = useState(hourly_wage);
  if (hourly_wage !== prevWage) {
    setPrevWage(hourly_wage);
    setWageInput(String(hourly_wage ?? ""));
  }

  const commitHours = () => {
    const value = Number(hoursInput);
    if (hoursInput === "" || Number.isNaN(value) || value === monthly_contracted_hours) {
      setHoursInput(String(monthly_contracted_hours ?? ""));
      return;
    }
    onUpdate(employee_id, "monthly_contracted_hours", value);
  };

  const commitWage = () => {
    const value = Number(wageInput);
    if (wageInput === "" || Number.isNaN(value) || value === hourly_wage) {
      setWageInput(String(hourly_wage ?? ""));
      return;
    }
    onUpdate(employee_id, "hourly_wage", value);
  };

  return (
    <Card>
      <DeleteButton
        type="button"
        onClick={() => setIsDeleteConfirmOpen(true)}
        aria-label={`${name} 퇴사 처리`}
      >
        ✕
      </DeleteButton>

      <DeleteConfirmModal
        open={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        employeeName={name}
      />

      <NameArea>
        <Avatar>{name[0]}</Avatar>
        <NameGroup>
          <Name>{name}</Name>
          <EmployeeNumber>직원 #{employee_id}</EmployeeNumber>
        </NameGroup>
      </NameArea>

      <TypeArea>
        <TypeSelect
          value={employment_type}
          onChange={(e) => onUpdate(employee_id, "employment_type", e.target.value)}
        >
          {Object.entries(EMPLOYMENT_TYPE_LABEL).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </TypeSelect>
      </TypeArea>

      <HoursArea>
        <Input
          type="number"
          unit="시간"
          value={hoursInput}
          onChange={(e) => setHoursInput(e.target.value)}
          onBlur={commitHours}
        />
      </HoursArea>

      <WageArea>
        <Input
          type="text"
          inputMode="numeric"
          unit="원"
          value={wageInput ? Number(wageInput).toLocaleString() : ""}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/,/g, "").replace(/\D/g, "");
            setWageInput(onlyNumbers);
          }}
          onBlur={commitWage}
        />
      </WageArea>

      <GrossPayArea>
        <FieldLabel>세전 급여</FieldLabel>
        <GrossPay>{grossPay.toLocaleString()}</GrossPay>
      </GrossPayArea>

      <DetailButtonArea>
        <DetailButton type="button" disabled={!paymentId} onClick={() => onViewPayslip(paymentId)}>
          📄 {DETAIL_BUTTON_LABEL[employment_type]} &gt;
        </DetailButton>
      </DetailButtonArea>

      <TaxArea>
        <FieldLabel>원천세</FieldLabel>
        <TaxValue $hasTaxOwed={hasTaxOwed}>
          {withholdingTax.toLocaleString()}원
          {withholdingNote && <TaxNote> ({withholdingNote})</TaxNote>}
        </TaxValue>
      </TaxArea>
    </Card>
  );
}

export default EmployeeRow;
