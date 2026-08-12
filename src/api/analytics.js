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