export const FEATURES = [
  {
    id: "vat",
    name: "월 마감 세무자료",
    tag: "TAX",
    desc: "CODEF로 가져온 매입 데이터를 기반으로 예상 부가세와 면세·과세 항목을 자동 계산해 보여줍니다.",
  },
  {
    id: "payroll",
    name: "급여·원천세",
    tag: "PAYROLL",
    desc: "직원 급여와 원천세를 계산하고, 4대보험 가입 대상 판정과 퇴직급여 계산까지 함께 처리합니다.",
  },
  {
    id: "qna",
    name: "AI 세무 Q&A",
    tag: "AI",
    desc: "매장 실데이터와 법령 정보를 결합해 세무 질문에 답하고, 답변마다 근거 출처를 함께 제공합니다.",
  },
];

export const TECH_STACK = [
  "React",
  "styled-components",
  "Axios",
  "CODEF API",
];