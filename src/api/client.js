import axios from "axios";

const client = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// TODO: 인증 토큰 붙이는 로직 필요해지면 request 인터셉터에 추가
// TODO: 공통 에러 처리(401 리다이렉트 등) 필요해지면 response 인터셉터에 추가

// 백엔드가 { success, data, message } envelope으로 응답하므로 res.data를 실제 payload(data.data)로 언랩한다.
// blob/text 등 envelope이 아닌 응답(CSV 내보내기 등 responseType 지정 요청)은 그대로 통과시킨다.
client.interceptors.response.use((res) => {
  if (res.data && typeof res.data === "object" && "data" in res.data) {
    res.data = res.data.data;
  }
  return res;
});

export default client;
