import { useState } from "react";
import styled from "styled-components";
import PayrollHeader from "./components/PayrollHeader";
import PayrollSummaryCards from "./components/PayrollSummaryCards";
import EmployeeTable from "./components/EmployeeTable";
import AddEmployeeModal from "./components/AddEmployeeModal";

// TODO: 백엔드 연동 시 getEmployees() 응답으로 교체
const MOCK_EMPLOYEES = [
  {
    employee_id: 1,
    name: "허현",
    employment_type: "REGULAR", // TODO: 백엔드 실제 enum 값 확인 필요
    hourly_wage: 10320,
    monthly_contracted_hours: 141,
    work_started_at: "2025-11-01",
    status: "ACTIVE",
  },
  {
    employee_id: 2,
    name: "황사라",
    employment_type: "PART_TIME",
    hourly_wage: 10320,
    monthly_contracted_hours: 43.2,
    work_started_at: "2026-06-01",
    status: "ACTIVE",
  },
  {
    employee_id: 3,
    name: "윤재원",
    employment_type: "FREELANCER", // TODO: 백엔드 실제 enum 값 확인 필요
    hourly_wage: 12000,
    monthly_contracted_hours: 90,
    work_started_at: "2026-03-15",
    status: "ACTIVE",
  },
];

function PayrollPage() {
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateEmployee = (employeeId, field, value) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.employee_id === employeeId ? { ...emp, [field]: value } : emp))
    );
    // TODO: 백엔드 연동 시 updateEmployee(employeeId, { [field]: value }) 호출 추가
  };

  const handleAddEmployee = (newEmployeeData) => {
    setEmployees((prev) => [
      ...prev,
      { ...newEmployeeData, employee_id: Date.now(), status: "ACTIVE" },
    ]);
    setIsModalOpen(false);
    // TODO: 백엔드 연동 시 createEmployee(newEmployeeData) 호출 후 getEmployees() 재조회로 교체
  };

  // 세전급여·원천세는 API 응답에 없는 파생값 - 프론트에서 계산
  const withCalculated = employees.map((emp) => {
    const grossPay = emp.hourly_wage * emp.monthly_contracted_hours;
    const isFreelancer = emp.employment_type === "FREELANCER";
    const withholdingTax = isFreelancer ? Math.round(grossPay * 0.033) : 0;
    // TODO: REGULAR/PART_TIME 원천세는 간이세액표 기준 - withholding-tax/calculate API 연동 후 반영
    return {
      ...emp,
      grossPay,
      withholdingTax,
      withholdingNote: isFreelancer ? "3.3%" : grossPay > 0 && withholdingTax === 0 ? "소액부징수" : null,
    };
  });

  const totalGrossPay = withCalculated.reduce((sum, emp) => sum + emp.grossPay, 0);
  const totalWithholdingTax = withCalculated.reduce((sum, emp) => sum + emp.withholdingTax, 0);

  return (
    <Wrapper>
      <PayrollHeader onAddClick={() => setIsModalOpen(true)} />
      <PayrollSummaryCards totalExpense={totalGrossPay} totalWithholdingTax={totalWithholdingTax} />
      <EmployeeTable employees={withCalculated} onUpdateEmployee={handleUpdateEmployee} />
      <AddEmployeeModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddEmployee} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 16px 32px 24px;
`;

export default PayrollPage;