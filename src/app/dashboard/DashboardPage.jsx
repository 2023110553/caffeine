import { useState, useEffect } from "react";
import styled from "styled-components";
import { getMonthlySummary, getDeductionBreakdown } from "../../api/analytics";
import { getClosingSummary, approveClosing } from "../../api/tax";
import { useBusiness } from "../../contexts/BusinessContext";
import SummaryHeader from "./components/SummaryHeader";
import VatReserveCard from "./components/VatReserveCard";
import SalesExpenseCard from "./components/SalesExpenseCard";
import CleanDataExport from "./components/CleanDataExport";
import DeductionAnalysisCard from "./components/DeductionAnalysisCard";
import Loading from "../../components/Loading";

// TODO: 백엔드 연동 시 getMonthlySummary() 응답으로 교체
const MOCK_SUMMARY = {
  year: 2026, month: 8,
  vat_reserve_amount: 425000,
  vat_breakdown: { sales_tax: 1200000, purchase_tax: 480000, deemed_purchase_deduction: 295000 },
  vat_filing_due_date: "2026-10-25",
  tax_type: "GENERAL",
  total_sales: 12000000,
    total_expense: 7750000,
  net_profit: 4250000,
  profit_margin: 35.4,
  expense_breakdown: [
    { category: "재료비", amount: 3200000, ratio: 41 },
    { category: "인건비", amount: 2800000, ratio: 36 },
    { category: "임차료·관리비", amount: 1200000, ratio: 16 },
    { category: "기타 경비", amount: 550000, ratio: 7 },
  ],
};

// TODO: 백엔드 연동 시 getDeductionBreakdown() 응답으로 교체
const MOCK_DEDUCTION = {
  deduction_grade: "공제율 우수",
  total_deductible_amount: 775000,
  structure: [
    { category: "과세매입(공제가능)", ratio: 64.6, amount: 5880000 },
    { category: "의제재료(의제매입)", ratio: 24.2, amount: 2200000 },
    { category: "비공제 지출", ratio: 11.2, amount: 1020000 },
  ],
  item_details: [
    { item_name: "우유유제품", deduction_type: "면세공제", category: "면세 의제매입", rate: 91 },
    { item_name: "원두·커피재료", deduction_type: "면세공제", category: "면세 의제매입", rate: 88 },
    { item_name: "포장재·소모품", deduction_type: "과세공제", category: "과세매입", rate: 72 },
    { item_name: "전기·가스요금", deduction_type: "과세공제", category: "과세매입", rate: 66 },
  ],
};

const YEAR = 2026;
const MONTH = 8; // TODO: 실제로는 현재 월 기준 동적 계산 필요
const YEAR_MONTH = `${YEAR}-${String(MONTH).padStart(2, "0")}`;

function DashboardPage() {
  const { business } = useBusiness();
  const businessId = business.businessId;

  const [summary, setSummary] = useState(MOCK_SUMMARY);
  const [deduction, setDeduction] = useState(MOCK_DEDUCTION);
  const [isClosed, setIsClosed] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: 백엔드 구현 완료되면 아래 주석 해제하고 위 summary/deduction mock state 초기값을 null로 되돌리기
  // (analytics.js의 getMonthlySummary/getDeductionBreakdown도 아직 business_id를 안 보내고 있어서 함께 확인 필요)

  /* useEffect(() => {
    const loadData = async () => {
      try {
        const [summaryRes, deductionRes] = await Promise.all([
          getMonthlySummary(YEAR, MONTH),
          getDeductionBreakdown(YEAR, MONTH),
        ]);
        setSummary(summaryRes.data.data);
        setDeduction(deductionRes.data.data);
      } catch (err) {
        // TODO: 에러 처리
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []); */

  // 마감 상태 초기 조회: GET /tax/closing/{year_month}/ 응답의 status로 판단 (summary/deduction과 별개로 실제 연동)
  useEffect(() => {
    if (!businessId) return; // TODO: BusinessContext에 실제 business_id가 채워지면 자동으로 동작함 (현재는 setup 연동 전이라 임시로 null)

    const loadClosingStatus = async () => {
      try {
        const res = await getClosingSummary(businessId, YEAR_MONTH);
        setIsClosed(res.data.data.status === "CLOSED");
      } catch (err) {
        // TODO: 에러 처리
      }
    };
    loadClosingStatus();
  }, [businessId]);

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      await approveClosing(businessId, YEAR_MONTH);
      setIsClosed(true);
    } catch (err) {
      // TODO: 409(MONTH_ALREADY_CLOSED), 422(UNCONFIRMED_TRANSACTIONS_EXIST) 등 에러 처리
    } finally {
      setIsApproving(false);
    }
  };

  if (isLoading) return <Loading />;
  if (!summary || !deduction) return null;

  return (
    <Wrapper>
      <SummaryHeader
        year={summary.year}
        month={summary.month}
        isClosed={isClosed}
        isApproving={isApproving}
        onApprove={handleApprove}
      />

      <ColumnGrid>
        <LeftColumn>
          <VatReserveCard summary={summary} />
          <SalesExpenseCard summary={summary} />
        </LeftColumn>
        <RightColumn>
          <CleanDataExport year={YEAR} month={MONTH} isClosed={isClosed} />
          <DeductionAnalysisCard deduction={deduction} />
        </RightColumn>
      </ColumnGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px; /* TODO: design token화 */
  padding: 24px 32px;
`;

const ColumnGrid = styled.div`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px; /* TODO: design token화 */
  align-items: start;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px; /* TODO: design token화 */
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px; /* TODO: design token화 */
`;

export default DashboardPage;