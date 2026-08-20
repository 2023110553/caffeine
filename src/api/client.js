import axios from "axios";

const client = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// TODO: 인증 토큰 붙이는 로직 필요해지면 request 인터셉터에 추가
// TODO: 401 리다이렉트 등 인증 관련 공통 처리 필요해지면 아래 onRejected에 추가

// 백엔드가 { success, data, message } envelope으로 응답하므로 res.data를 실제 payload(data.data)로 언랩한다.
// blob/text 등 envelope이 아닌 응답(CSV 내보내기 등 responseType 지정 요청)은 그대로 통과시킨다.
client.interceptors.response.use(
  (res) => {
    if (res.data && typeof res.data === "object" && "data" in res.data) {
      res.data = res.data.data;
    }
    return res;
  },
  (err) => {
    // 호출부가 매번 err.response?.data?.message를 직접 파싱하지 않도록 err.userMessage로 표준화
    err.userMessage = err.response?.data?.message ?? "요청 처리 중 문제가 발생했어요";
    return Promise.reject(err);
  },
);

export default client;
