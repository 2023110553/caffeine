import client from "./client";

// AI 경영 진단 + 상권 벤치마크 종합 대시보드 (스탯, AI 처방, 비용 구조, 추이 통합)
export const getBenchmarkDashboard = (businessId, year, month, region) =>
  client.get(`/businesses/${businessId}/benchmark/`, { params: { year, month, region } });

// 카테고리별 비용 비교만 단독 조회
export const getBenchmarkCategories = (businessId, year, month, region) =>
  client.get(`/businesses/${businessId}/benchmark/categories/`, {
    params: { year, month, region },
  });

// 월별 벤치마크 추이만 단독 조회
export const getBenchmarkTrend = (businessId, year, month, region) =>
  client.get(`/businesses/${businessId}/benchmark/trend/`, { params: { year, month, region } });

// AI 경영 진단 새로고침 (OpenAI 강제 재실행)
export const refreshBenchmarkAiDiagnosis = (businessId, year, month) =>
  client.post(`/businesses/${businessId}/benchmark/ai-diagnosis/`, { year, month });

// AI 심층 경영진단 리포트 (비용 구조 정밀 진단 + 절감 시뮬레이션 + 우선 실행 과제)
export const getBenchmarkDeepDiagnosis = (businessId, year, month) =>
  client.get(`/businesses/${businessId}/benchmark/deep-diagnosis/`, { params: { year, month } });
