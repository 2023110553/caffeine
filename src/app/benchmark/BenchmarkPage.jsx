import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import BenchmarkHeader from "./components/BenchmarkHeader";
import BenchmarkStatCards from "./components/BenchmarkStatCards";
import AiPrescriptionSummary from "./components/AiPrescriptionSummary";
import AiDeepDiagnosisModal from "./components/AiDeepDiagnosisModal";
import CategoryComparisonCard from "./components/CategoryComparisonCard";
import TrendChartCard from "./components/TrendChartCard";
import Loading from "../../components/Loading";
import ErrorState from "../../components/ErrorState";
import { useBusiness } from "../../contexts/BusinessContext";
import { useAsync } from "../../hooks/useAsync";
import { getBenchmarkDashboard } from "../../api/benchmark";

const now = new Date();
const YEAR = now.getFullYear();
const MONTH = now.getMonth() + 1;

function BenchmarkPage() {
  const { business } = useBusiness();
  const [dashboard, setDashboard] = useState(null);
  const [isDiagnosisModalOpen, setIsDiagnosisModalOpen] = useState(false);

  const { isLoading, error, run } = useAsync({
    errorMessage: "경영 분석 데이터를 불러오지 못했어요.",
  });

  const loadData = useCallback(async () => {
    const res = await getBenchmarkDashboard(business.businessId, YEAR, MONTH);
    setDashboard(res.data);
  }, [business.businessId]);

  useEffect(() => {
    run(loadData);
  }, [run, loadData]);

  if (isLoading) return <Loading />;
  if (error)
    return (
      <ErrorState message="경영 분석 데이터를 불러오지 못했어요." onRetry={() => run(loadData)} />
    );
  if (!dashboard) return null;

  const { overview, ai_prescriptions, category_comparison, monthly_trends } = dashboard;

  return (
    <Wrapper>
      <BenchmarkHeader year={YEAR} month={MONTH} />

      <BenchmarkStatCards overview={overview} monthlyTrends={monthly_trends} />

      <AiPrescriptionSummary
        prescriptions={ai_prescriptions}
        onDetailClick={() => setIsDiagnosisModalOpen(true)}
      />

      <ColumnGrid>
        <CategoryComparisonCard
          categoryComparison={category_comparison}
          totalRevenue={overview.total_revenue}
        />
        <TrendChartCard monthlyTrends={monthly_trends} />
      </ColumnGrid>

      <AiDeepDiagnosisModal
        open={isDiagnosisModalOpen}
        onClose={() => setIsDiagnosisModalOpen(false)}
        businessId={business.businessId}
        year={YEAR}
        month={MONTH}
      />
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
  gap: 16px; /* TODO: design token화 */
  padding: 20px 28px;

  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari - 스크롤바 숨김, BusinessInfoForm FormArea와 동일 패턴 */
  }
`;

const ColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 365fr 511fr;
  gap: 14px; /* TODO: design token화 */
  align-items: start;
`;

export default BenchmarkPage;
