import { useState } from "react";
import styled from "styled-components";
import PayrollHeader from "./components/PayrollHeader";
import PayrollSummaryCards from "./components/PayrollSummaryCards";
import EmployeeTable from "./components/EmployeeTable";
import AddEmployeeModal from "./components/AddEmployeeModal";

// TODO: 백엔드 연동 시 getEmployees() 응답으로 교체
const MOCK_EMPLOYEES = [
  {
    id: 1,
    employeeNumber: 1,
    name: "허현",
    employmentType: "regular",
    hourlyWage: 10320,
    monthlyHours: 141,
    withholdingTax: 0,
    withholdingNote: "소액부징수",
  },
  {
    id: 2,
    employeeNumber: 2,
    name: "황사라",
    employmentType: "parttime",
    hourlyWage: 10320,
    monthlyHours: 43.2,
    withholdingTax: 0,
    withholdingNote: null,
  },
  {
    id: 3,
    employeeNumber: 3,
    name: "윤재원",
    employmentType: "freelancer",
    hourlyWage: 12000,
    monthlyHours: 90,
    withholdingTax: 35640,
    withholdingNote: "3.3%",
  },
];

function PayrollPage() {
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateEmployee = (id, field, value) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id !== id) return emp;
        const updated = { ...emp, [field]: value };

        // 프리랜서는 고정 세율(3.3%)이라 실시간 재계산 안전
        if (updated.employmentType === "freelancer") {
          const grossPay = updated.hourlyWage * updated.monthlyHours;
          updated.withholdingTax = Math.round(grossPay * 0.033);
        }
        // 정직원/단시간 근로자는 간이세액표 기준이라 프론트에서 재계산하지 않음
        // TODO: withholding-tax/calculate API 연동 후 실시간 반영

        return updated;
      })
    );
  };

  const handleAddEmployee = (newEmployee) => {
    setEmployees((prev) => [
      ...prev,
      { ...newEmployee, id: Date.now(), employeeNumber: prev.length + 1 },
    ]);
    setIsModalOpen(false);
  };

  const totalGrossPay = employees.reduce(
    (sum, emp) => sum + emp.hourlyWage * emp.monthlyHours,
    0
  );
  const totalWithholdingTax = employees.reduce(
    (sum, emp) => sum + emp.withholdingTax,
    0
  );

  return (
    <Wrapper>
      <PayrollHeader onAddClick={() => setIsModalOpen(true)} />
      <PayrollSummaryCards
        totalExpense={totalGrossPay}
        totalWithholdingTax={totalWithholdingTax}
      />
      <EmployeeTable
        employees={employees}
        onUpdateEmployee={handleUpdateEmployee}
      />
      <AddEmployeeModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddEmployee}
      />
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