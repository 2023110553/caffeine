import { useState, useEffect, useCallback } from "react";
import Modal from "../../../components/Modal";
import { getBenchmarkDeepDiagnosis } from "../../../api/benchmark";
import {
  ModalHeader,
  HeaderTopRow,
  TextGroup,
  Badge,
  Title,
  SubText,
  CloseButton,
  ModalBody,
  StateText,
  BadgeWrapper,
  StatusCard,
  StatusBadge,
  StatusDescription,
  MetricRow,
  MetricItem,
  MetricLabel,
  MetricBadge,
  MetricValue,
  BodyGrid,
  LeftColumn,
  RightColumn,
  CostStructureCard,
  CostStructureHeader,
  CostStructureHeaderSub,
  CostStructureBar,
  CostStructureBarSegment,
  CostItemList,
  CostItem,
  CostItemDot,
  CostItemName,
  CostItemAmount,
  CostItemBarTrack,
  CostItemBarFill,
  CostItemRatio,
  CostItemStatus,
  InsightCard,
  InsightHeader,
  InsightContent,
  SimulationCard,
  SimulationHeader,
  SimulationBody,
  SimulationTitle,
  SimulationRow,
  SimulationLabel,
  SimulationValueGroup,
  SimulationValue,
  SimulationDiff,
  SimulationFootnote,
  ActionCard,
  ActionHeader,
  ActionList,
  ActionItem,
  ActionRankDot,
  ActionBody,
  ActionCategory,
  ActionTask,
} from "./AiDeepDiagnosisModal.styles";

// overall_summary.status_badge는 "양호"/"주의"/"위험" 같은 한글 라벨로 내려와 배지 톤 매핑용 키가 필요함
const STATUS_LABEL_TO_GRADE = {
  양호: "GOOD",
  주의: "CAUTION",
  위험: "BAD",
};

const COST_ITEM_COLORS = ["#B4632A", "#7A4A2E", "#C7B8A8", "#DDD3C5"]; // TODO: theme.js에 없는 값들, 진→연 브라운 그라데이션

const ACTION_RANK_COLOR = {
  HIGH: "#DC2626",
  MEDIUM: "#EA580C",
  GOAL: "#059669",
};

function AiDeepDiagnosisModal({ open, onClose, businessId, year, month }) {
  const [diagnosis, setDiagnosis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadDiagnosis = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getBenchmarkDeepDiagnosis(businessId, year, month);
      setDiagnosis(res.data);
    } catch (err) {
      console.error("심층 진단 리포트 조회 실패:", err);
      setError("심층 진단 리포트를 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [businessId, year, month]);

  useEffect(() => {
    if (open) loadDiagnosis();
  }, [open, loadDiagnosis]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      width="960px"
      height="578px"
      radius="24px"
      padding="0"
      background="#FFF"
      boxShadow="0 32px 80px 0 rgba(61, 37, 30, 0.22), 0 4px 16px 0 rgba(61, 37, 30, 0.08)"
      hideHeader
      flexColumn
    >
      <ModalHeader>
        <HeaderTopRow>
          <TextGroup>
            <BadgeWrapper>
              <Badge>🤖 AI 심층 경영진단</Badge>
            </BadgeWrapper>
            <Title>{month}월 경영 종합 진단 리포트</Title>
            <SubText>
              {diagnosis?.year_month ?? `${year}-${String(month).padStart(2, "0")}`} 기준 · 최근
              6개월 매출/비용 결산 데이터 기반
            </SubText>
          </TextGroup>

          <CloseButton type="button" onClick={onClose}>
            ✕
          </CloseButton>
        </HeaderTopRow>
      </ModalHeader>
      <ModalBody>
        {isLoading && <StateText>불러오는 중...</StateText>}
        {!isLoading && error && <StateText>{error}</StateText>}

        {!isLoading && !error && diagnosis && (
          <>
            <StatusCard>
              <StatusBadge
                $grade={STATUS_LABEL_TO_GRADE[diagnosis.overall_summary.status_badge] ?? "GOOD"}
              >
                현재 경영 상태: {diagnosis.overall_summary.status_badge}
              </StatusBadge>
              <StatusDescription>{diagnosis.overall_summary.headline}</StatusDescription>

              <MetricRow>
                {diagnosis.overall_summary.kpis.map((kpi) => (
                  <MetricItem key={kpi.label}>
                    <MetricLabel>{kpi.label}:</MetricLabel>
                    <MetricBadge $grade={kpi.status}>
                      {kpi.status === "GOOD" ? "양호" : kpi.status === "CAUTION" ? "주의" : "위험"}
                    </MetricBadge>
                    <MetricValue>{kpi.value}</MetricValue>
                  </MetricItem>
                ))}
              </MetricRow>
            </StatusCard>

            <BodyGrid>
              <LeftColumn>
                <CostStructureCard>
                  <CostStructureHeader>
                    ① 비용 구조 정밀 진단{" "}
                    <CostStructureHeaderSub>
                      (지출 {Math.round(diagnosis.total_expense / 10000).toLocaleString()}만 원
                      분석)
                    </CostStructureHeaderSub>
                  </CostStructureHeader>

                  <CostStructureBar>
                    {diagnosis.cost_structure_diagnosis.map((item, i) => (
                      <CostStructureBarSegment
                        key={item.category}
                        style={{
                          width: `${item.share_of_expense}%`,
                          backgroundColor: COST_ITEM_COLORS[i % COST_ITEM_COLORS.length],
                        }}
                      />
                    ))}
                  </CostStructureBar>

                  <CostItemList>
                    {diagnosis.cost_structure_diagnosis.map((item, i) => (
                      <CostItem key={item.category}>
                        <CostItemDot
                          style={{ backgroundColor: COST_ITEM_COLORS[i % COST_ITEM_COLORS.length] }}
                        />
                        <CostItemName>{item.name}</CostItemName>
                        <CostItemAmount>
                          약 {Math.round(item.amount / 10000).toLocaleString()}만 원
                        </CostItemAmount>
                        <CostItemBarTrack>
                          <CostItemBarFill
                            style={{
                              width: `${item.share_of_expense}%`,
                              backgroundColor: COST_ITEM_COLORS[i % COST_ITEM_COLORS.length],
                            }}
                          />
                        </CostItemBarTrack>
                        <CostItemRatio>{item.ratio}%</CostItemRatio>
                        {item.status_label && <CostItemStatus>{item.status_label}</CostItemStatus>}
                      </CostItem>
                    ))}
                  </CostItemList>
                </CostStructureCard>

                {diagnosis.management_insights.map((insight, index) => (
                  <InsightCard key={insight.content} $type={insight.type}>
                    {insight.title && (
                      <InsightHeader $color={index === 0 ? "#92400E" : "#14532D"}>
                        {insight.type === "WARNING" ? "⚠️" : "👍"} {insight.title}
                      </InsightHeader>
                    )}
                    <InsightContent $color={index === 0 ? "#78350F" : "#14532D"}>
                      {!insight.title && (insight.type === "WARNING" ? "⚠️ " : "👍 ")}
                      {insight.content}
                    </InsightContent>
                  </InsightCard>
                ))}
              </LeftColumn>

              <RightColumn>
                <SimulationCard>
                  <SimulationHeader>💡 비용 절감 시뮬레이션 (가설)</SimulationHeader>
                  <SimulationBody>
                    <SimulationTitle>{diagnosis.cost_saving_simulation.title}</SimulationTitle>

                    <SimulationRow>
                      <SimulationLabel>월 비용 절감</SimulationLabel>
                      <SimulationValueGroup>
                        <SimulationValue>
                          {diagnosis.cost_saving_simulation.saved_amount_manwon}
                        </SimulationValue>
                      </SimulationValueGroup>
                    </SimulationRow>
                    <SimulationRow>
                      <SimulationLabel>월 영업이익</SimulationLabel>
                      <SimulationValueGroup>
                        <SimulationValue>
                          {diagnosis.cost_saving_simulation.current_profit_manwon} →{" "}
                          {diagnosis.cost_saving_simulation.simulated_profit_manwon}
                        </SimulationValue>
                        <SimulationDiff>
                          ({diagnosis.cost_saving_simulation.profit_diff_manwon})
                        </SimulationDiff>
                      </SimulationValueGroup>
                    </SimulationRow>
                    <SimulationRow>
                      <SimulationLabel>영업이익률</SimulationLabel>
                      <SimulationValueGroup>
                        <SimulationValue>
                          {diagnosis.cost_saving_simulation.current_margin}% →{" "}
                          {diagnosis.cost_saving_simulation.simulated_margin}%
                        </SimulationValue>
                        <SimulationDiff>
                          +{diagnosis.cost_saving_simulation.margin_diff_pct}%p ▲
                        </SimulationDiff>
                      </SimulationValueGroup>
                    </SimulationRow>
                  </SimulationBody>
                  <SimulationFootnote>*단순 시뮬레이션 추정치입니다.</SimulationFootnote>
                </SimulationCard>

                <ActionCard>
                  <ActionHeader>🎯 사장님 우선 실행 과제</ActionHeader>
                  <ActionList>
                    {diagnosis.priority_action_tasks.map((task) => (
                      <ActionItem key={task.rank}>
                        <ActionRankDot style={{ backgroundColor: ACTION_RANK_COLOR[task.level] }} />
                        <ActionBody>
                          <ActionCategory style={{ color: ACTION_RANK_COLOR[task.level] }}>
                            {task.priority_label} {task.category}
                          </ActionCategory>
                          <ActionTask>{task.task}</ActionTask>
                        </ActionBody>
                      </ActionItem>
                    ))}
                  </ActionList>
                </ActionCard>
              </RightColumn>
            </BodyGrid>
          </>
        )}
      </ModalBody>
    </Modal>
  );
}

export default AiDeepDiagnosisModal;
