import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { getMonthlySummary, getDeductionBreakdown } from "../../api/analytics";
import { getClosingSummary, approveClosing } from "../../api/tax";
import { useBusiness } from "../../contexts/BusinessContext";
import { useToast } from "../../contexts/ToastContext";
import { useAsync } from "../../hooks/useAsync";
import SummaryHeader from "./components/SummaryHeader";
import VatReserveCard from "./components/VatReserveCard";
import SalesExpenseCard from "./components/SalesExpenseCard";
import CleanDataExport from "./components/CleanDataExport";
import DeductionAnalysisCard from "./components/DeductionAnalysisCard";
import Loading from "../../components/Loading";
import ErrorState from "../../components/ErrorState";

const now = new Date();
const YEAR = now.getFullYear();
const MONTH = now.getMonth() + 1;
const YEAR_MONTH = `${YEAR}-${String(MONTH).padStart(2, "0")}`;

function DashboardPage() {
  const { business } = useBusiness();
  const showToast = useToast();
  const businessId = business.businessId;

  const [summary, setSummary] = useState(null);
  const [deduction, setDeduction] = useState(null);
  const [isClosed, setIsClosed] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const {
    isLoading,
    error: loadError,
    run,
  } = useAsync({
    errorMessage: "대시보드 데이터 조회 실패:",
  });

  const loadData = useCallback(async () => {
    const [summaryRes, deductionRes] = await Promise.all([
      getMonthlySummary(businessId, YEAR, MONTH),
      getDeductionBreakdown(businessId, YEAR, MONTH),
    ]);
    setSummary(summaryRes.data);
    setDeduction(deductionRes.data);
  }, [businessId]);

  useEffect(() => {
    if (!businessId) return;
    run(loadData);
  }, [businessId, run, loadData]);

  // 마감 상태 초기 조회: GET /tax/closing/{year_month}/ 응답의 status로 판단 (summary/deduction과 별개로 실제 연동)
  useEffect(() => {
    if (!businessId) return;

    const loadClosingStatus = async () => {
      try {
        const res = await getClosingSummary(businessId, YEAR_MONTH);
        setIsClosed(res.data.status === "CLOSED");
      } catch (err) {
        // 조회 실패 시 마감 전 상태로 간주 (다운로드/승인 버튼은 비활성 유지)
        console.error("마감 상태 조회 실패:", err);
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
      if (err.response?.status === 409) {
        showToast("이미 마감 승인된 월입니다.");
      } else if (err.response?.status === 422) {
        showToast("확인되지 않은 거래가 있어 마감할 수 없습니다.");
      } else {
        showToast("마감 승인 중 오류가 발생했습니다.");
      }
    } finally {
      setIsApproving(false);
    }
  };

  if (isLoading) return <Loading />;
  if (loadError) return <ErrorState message={loadError} onRetry={() => run(loadData)} />;
  if (!summary || !deduction) return null;

  return (
    <Wrapper>
      <SummaryHeader
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
          <CleanDataExport year={YEAR} month={MONTH} />
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
  gap: 20px; /* TODO: design token화 */
  align-items: start;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* TODO: design token화 */
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* TODO: design token화 */
`;

export default DashboardPage;
