import client from "./client";

// 질문 전송 → tax/analytics 결과 조회 후 AI가 자연어로 답변
export const sendChatMessage = (data) =>
  client.post(`/chat/messages/`, data);

// 대화 이력 조회
export const getChatMessages = () =>
  client.get(`/chat/messages/`);