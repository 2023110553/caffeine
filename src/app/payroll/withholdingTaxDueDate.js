const WITHHOLDING_TAX_DUE_DAY = 10;

// 원천세는 급여를 지급한 달의 다음 달 10일까지 납부
export function getWithholdingTaxDueDate(year, month) {
  const dueDate = new Date(Number(year), Number(month), 1);
  return {
    dueYear: dueDate.getFullYear(),
    dueMonth: dueDate.getMonth() + 1,
    dueDay: WITHHOLDING_TAX_DUE_DAY,
  };
}
