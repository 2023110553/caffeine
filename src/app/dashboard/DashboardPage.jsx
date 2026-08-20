import { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { getMonthlySummary, getDeductionBreakdown } from "../../api/analytics";
import { approveClosing } from "../../api/tax";
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
  // idle | approving | success - 승인 버튼 피드백 상태. 실패는 토스트로 안내하고 idle로 되돌린다.
  const [approveStatus, setApproveStatus] = useState("idle");
  const approveStatusTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (approveStatusTimeoutRef.current) clearTimeout(approveStatusTimeoutRef.current);
    };
  }, []);

  const {
    isLoading,
    error: loadError,
    run,
  } = useAsync({
    errorMessage: "대시보드 데이터를 불러오지 못했어요. 사업장 정보를 확인해주세요.",
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

  const handleApprove = async () => {
    if (approveStatusTimeoutRef.current) clearTimeout(approveStatusTimeoutRef.current);
    setApproveStatus("approving");
    try {
      await approveClosing(businessId, YEAR_MONTH);
      setApproveStatus("success");
      approveStatusTimeoutRef.current = setTimeout(() => setApproveStatus("idle"), 1600);
    } catch (err) {
      setApproveStatus("idle");
      if (err.response?.status === 409) {
        showToast("이미 마감 승인된 월입니다.");
      } else if (err.response?.status === 422) {
        showToast("확인되지 않은 거래가 있어 마감할 수 없습니다.");
      } else {
        showToast("마감 승인 중 오류가 발생했습니다.");
      }
    }
  };

  if (isLoading) return <Loading />;
  if (loadError) return <ErrorState message={loadError} onRetry={() => run(loadData)} />;
  if (!summary || !deduction) return null;

  return (
    <Wrapper>
      <SummaryHeader
        month={summary.month}
        approveStatus={approveStatus}
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
  scrollbar-width: none; /* Firefox */
  display: flex;
  flex-direction: column;
  gap: 20px; /* TODO: design token화 */
  padding: 24px 32px;

  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari - 스크롤바 숨김, BusinessInfoForm FormArea와 동일 패턴 */
  }
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
