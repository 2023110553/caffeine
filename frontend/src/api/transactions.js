import client from "./client";

// CODEF 수집 → 정규화 → 중복처리 → 카테고리 분류(AI) 실행
export const syncTransactions = () =>
  client.post(`/transactions/sync/`);

// 거래 목록 (쿼리: month, type, source, category)
export const getTransactions = (params) =>
  client.get(`/transactions/`, { params });

// 거래 상세(분류된 카테고리 포함)
export const getTransaction = (id) =>
  client.get(`/transactions/${id}/`);

// AI 분류 오류 시 사용자 수정
export const updateTransactionCategory = (id, data) =>
  client.patch(`/transactions/${id}/category/`, data);

// 중복 의심 거래 목록
export const getDuplicateTransactions = () =>
  client.get(`/transactions/duplicates/`);

// 중복 여부 확정
export const confirmDuplicate = (id, data) =>
  client.patch(`/transactions/duplicates/${id}/`, data);