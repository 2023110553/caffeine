// 숫자만 입력해도 자동으로 구분자가 들어가도록 하는 입력값 포맷터 모음.
// 카드 입력(CardInputModal), 사업자 정보(BusinessInfoForm) 등 여러 폼에서 동일한 패턴이 반복되어 통합했다.

export function formatCardNumber(raw) {
  const digits = raw.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

export function formatExpiry(raw) {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function formatPhoneNumber(raw) {
  const digits = raw.replace(/\D/g, "").slice(0, 11); // 010-1234-5678 (3-4-4)
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export function formatBirthDate(raw) {
  const digits = raw.replace(/\D/g, "").slice(0, 8); // YYYY-MM-DD
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
}

// ISO 날짜 문자열(YYYY-MM-DD)을 "N월 N일" 형태로 변환
export function formatDate(isoDate) {
  const [, month, day] = isoDate.split("-");
  return `${Number(month)}월 ${Number(day)}일`;
}
