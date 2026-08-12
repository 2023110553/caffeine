import client from "./client";

// 직원 목록 조회
export const getEmployees = () =>
  client.get(`/payroll/employees/`);

// 직원 등록
export const createEmployee = (data) =>
  client.post(`/payroll/employees/`, data);

// 직원 정보 수정
export const updateEmployee = (id, data) =>
  client.patch(`/payroll/employees/${id}/`, data);

// 직원 삭제
export const deleteEmployee = (id) =>
  client.delete(`/payroll/employees/${id}/`);

// 월별 노무 요약 (이번 달 총 인건비 지출, 원천세 합계 등 - 요약 카드용)
export const getPayrollSummary = () =>
  client.get(`/payroll/summary/`);