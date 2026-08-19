import client from "./client";

// 카테고리별 비용 비율 (원재료비율 등)
export const getCostRatio = (month) =>
  client.get(`/analytics/cost-ratio/`, { params: { month } });

// 특정 카테고리 전월 대비 증감 추이
export const getCategoryTrend = (category) =>
  client.get(`/analytics/trend/`, { params: { category } });

// 매출·비용 종합 요약
export const getAnalyticsSummary = (month) =>
  client.get(`/analytics/summary/`, { params: { month } });

// 월별 세무 현황 결산 (홈 화면 상단부 통합)
export const getMonthlySummary = (businessId, year, month) =>
  client.get(`/businesses/${businessId}/analytics/monthly-summary/`, { params: { year, month } });

// 세무사 전달용 클린데이터 다운로드
export const exportCleanData = (businessId, year, month, format) =>
  client.get(`/businesses/${businessId}/analytics/export/`, { params: { year, month, format }, responseType: "blob" });

// 월별 장부 마감 승인 (⚠️ tax.js의 approveClosing과 역할 중복 가능성 - 팀 확인 필요)
export const approveMonthlyClose = (businessId, year, month) =>
  client.post(`/businesses/${businessId}/analytics/monthly-summary/close/`, { year, month });