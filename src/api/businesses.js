import client from "./client";

// 과세유형 변경 이력 조회
export const getTaxTypeHistory = (businessId) =>
  client.get(`/businesses/${businessId}/tax-type-history/`);

// 홈택스 조회 기반 과세유형 동기화
export const syncTaxType = (businessId) =>
  client.post(`/businesses/${businessId}/tax-type/sync/`);

// CODEF 간편인증 요청
export const requestCodefAuth = (businessId) =>
  client.post(`/businesses/${businessId}/codef-auth/`);

// 인증 진행상태 폴링
export const getCodefAuthStatus = (businessId) =>
  client.get(`/businesses/${businessId}/codef-auth/status/`);

// 인증 실패 시 재시도
export const retryCodefAuth = (businessId) =>
  client.post(`/businesses/${businessId}/codef-auth/retry/`);