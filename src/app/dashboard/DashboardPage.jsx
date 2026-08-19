import { useState, useEffect } from "react";
import styled from "styled-components";
import { getMonthlySummary, approveMonthlyClose } from "../../api/analytics";
import { getDeductionBreakdown } from "../../api/tax";
import SummaryHeader from "./components/SummaryHeader";
import VatReserveCard from "./components/VatReserveCard";
import SalesExpenseCard from "./components/SalesExpenseCard";
import CleanDataExport from "./components/CleanDataExport";
import DeductionAnalysisCard from "./components/DeductionAnalysisCard";
import Loading from "../../components/Loading";
import { useBusiness } from "../../contexts/BusinessContext";

const YEAR = 2026;
const MONTH = 8; // TODO: 실제로는 현재 월 기준 동적 계산 필요

function DashboardPage() {
  const { business } = useBusiness();
  const [summary, setSummary] = useState(null);
  const [deduction, setDeduction] = useState(null);
  const [isClosed, setIsClosed] = useState(false); // TODO: 초기 마감 상태 조회 API 명세서에 없음 - 확인 필요
  const [isApproving, setIsApproving] = useState(false);
  const [isSummaryLoading, setIsSummaryLoading] = useState(true);
  const [isDeductionLoading, setIsDeductionLoading] = useState(true);

  useEffect(() => {
    getMonthlySummary(business.businessId, YEAR, MONTH)
      .then((res) => setSummary(res.data.data))
      .catch(() => {
        // TODO: 에러 처리
      })
      .finally(() => setIsSummaryLoading(false));

    getDeductionBreakdown(business.businessId, YEAR, MONTH)
      .then((res) => setDeduction(res.data.data))
      .catch(() => {
        // TODO: 에러 처리
      })
      .finally(() => setIsDeductionLoading(false));
  }, [business.businessId]);

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      await approveMonthlyClose(business.businessId, YEAR, MONTH);
      setIsClosed(true);
    } catch {
      // TODO: 409(ALREADY_CLOSED) 등 에러 처리
    } finally {
      setIsApproving(false);
    }
  };

  if (isSummaryLoading) return <Loading />;
  if (!summary) return null;

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
          {isDeductionLoading ? <Loading /> : deduction && <DeductionAnalysisCard deduction={deduction} />}
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