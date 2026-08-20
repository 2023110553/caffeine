import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Modal from "../../../components/Modal";
import { getBenchmarkDeepDiagnosis } from "../../../api/benchmark";

// overall_summary.kpis[].status, cost_structure_diagnosis 막대색 등에 사용
const GRADE_TONE = {
  GOOD: { bg: "#D1FAE5", text: "#065F46" },
  CAUTION: { bg: "#FEF3C7", text: "#92400E" },
  BAD: { bg: "#FEE2E2", text: "#991B1B" },
};

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
      setDiagnosis(res.data.data);
    } catch {
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
            <SubText>{diagnosis?.year_month ?? `${year}-${String(month).padStart(2, "0")}`} 기준 · 최근 6개월 매출/비용 결산 데이터 기반</SubText>
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
              <StatusBadge $grade={STATUS_LABEL_TO_GRADE[diagnosis.overall_summary.status_badge] ?? "GOOD"}>
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
                      (지출 {Math.round(diagnosis.total_expense / 10000).toLocaleString()}만 원 분석)
                    </CostStructureHeaderSub>
                  </CostStructureHeader>

                  <CostStructureBar>
                    {diagnosis.cost_structure_diagnosis.map((item, i) => (
                      <CostStructureBarSegment
                        key={item.category}
                        style={{ width: `${item.share_of_expense}%`, backgroundColor: COST_ITEM_COLORS[i % COST_ITEM_COLORS.length] }}
                      />
                    ))}
                  </CostStructureBar>

                  <CostItemList>
                    {diagnosis.cost_structure_diagnosis.map((item, i) => (
                      <CostItem key={item.category}>
                        <CostItemDot style={{ backgroundColor: COST_ITEM_COLORS[i % COST_ITEM_COLORS.length] }} />
                        <CostItemName>{item.name}</CostItemName>
                        <CostItemAmount>약 {Math.round(item.amount / 10000).toLocaleString()}만 원</CostItemAmount>
                        <CostItemBarTrack>
                          <CostItemBarFill
                            style={{ width: `${item.share_of_expense}%`, backgroundColor: COST_ITEM_COLORS[i % COST_ITEM_COLORS.length] }}
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
                        <SimulationValue>{diagnosis.cost_saving_simulation.saved_amount_manwon}</SimulationValue>
                      </SimulationValueGroup>
                    </SimulationRow>
                    <SimulationRow>
                      <SimulationLabel>월 영업이익</SimulationLabel>
                      <SimulationValueGroup>
                        <SimulationValue>
                          {diagnosis.cost_saving_simulation.current_profit_manwon} → {diagnosis.cost_saving_simulation.simulated_profit_manwon}
                        </SimulationValue>
                        <SimulationDiff>({diagnosis.cost_saving_simulation.profit_diff_manwon})</SimulationDiff>
                      </SimulationValueGroup>
                    </SimulationRow>
                    <SimulationRow>
                      <SimulationLabel>영업이익률</SimulationLabel>
                      <SimulationValueGroup>
                        <SimulationValue>
                          {diagnosis.cost_saving_simulation.current_margin}% → {diagnosis.cost_saving_simulation.simulated_margin}%
                        </SimulationValue>
                        <SimulationDiff>+{diagnosis.cost_saving_simulation.margin_diff_pct}%p ▲</SimulationDiff>
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

const ModalHeader = styled.div`
  display: flex;
  padding: 28px 32px 20px 32px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  border-bottom: 0.8px solid rgba(61, 37, 30, 0.1);
`;

const HeaderTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Badge = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  border-radius: 99px;
  border: 0.8px solid rgba(61, 37, 30, 0.12);
  background: #FDF9F3; /* TODO: theme.js에 없는 값 */
  padding: 3px 10px;

  color: #3D251E; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif;
  font-size: 11px;
  font-weight: 700;
  line-height: 16.5px;
  letter-spacing: 0.1px;
`;

const Title = styled.h2`
  margin: 0;
  padding-top: 5px;

  color: #3D251E; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif;
  font-size: 20px;
  font-weight: 800;
  line-height: 24px;
  letter-spacing: -0.5px;
`;

const SubText = styled.p`
  margin: 0;
  padding-top: 5px;

  color: rgba(61, 37, 30, 0.45);
  font-family: "Noto Sans KR", sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
`;

const CloseButton = styled.button`
  display: flex;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 16px;
  border: 0.8px solid rgba(61, 37, 30, 0.1);
  background: none;

  padding: 0;

  color: rgba(61, 37, 30, 0.45);
  font-family: "Noto Sans KR", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
  text-align: center;

  cursor: pointer;
`;

const ModalBody = styled.div`
  display: flex;
  min-height: 377.9px;
  padding: 20px 32px 32px;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  align-self: stretch;
`;

const StateText = styled.p`
  width: 100%;
  padding-top: 60px;

  color: rgba(61, 37, 30, 0.5);
  font-family: "Noto Sans KR", sans-serif;
  font-size: 13px;
  text-align: center;
`;

const BadgeWrapper = styled.div`
  display: flex;
padding: 1.8px 172.75px 9.5px 0;
align-items: center;
align-self: stretch;
`

const StatusCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  padding: 16px 20px;
  border-radius: 14px;
  border: 0.8px solid rgba(61, 37, 30, 0.08);
  background: #FDF9F3; /* TODO: theme.js에 없는 값 */
`;

const StatusBadge = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 3px 10px;
  border-radius: 99px;
  background: ${({ $grade }) => GRADE_TONE[$grade].bg};

  color: ${({ $grade }) => GRADE_TONE[$grade].text};
  font-family: "Noto Sans KR", sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
`;

const StatusDescription = styled.p`
  margin: 0;
  padding-top: 8px;

  color: #3D251E; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 20.8px;
`;

const MetricRow = styled.div`
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  gap: 8px;

  padding-top: 14px;
  margin-top: 14px;
  border-top: 0.8px solid rgba(61, 37, 30, 0.1);
`;

const MetricItem = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 6px;
  padding: 5px 12px;

  border-radius: 99px;
  border: 0.8px solid rgba(61, 37, 30, 0.1);
  background: #FFF; /* TODO: theme.js에 없는 값 */
`;

const MetricLabel = styled.span`
  color: rgba(61, 37, 30, 0.55);
  font-family: "Noto Sans KR", sans-serif;
  font-size: 11px;
  font-weight: 700;
  line-height: 16.5px;
`;

const MetricBadge = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 1px 7px;
  border-radius: 99px;
  background: ${({ $grade }) => GRADE_TONE[$grade].bg};

  color: ${({ $grade }) => GRADE_TONE[$grade].text};
  font-family: "Noto Sans KR", sans-serif;
  font-size: 11px;
  font-weight: 600;
  line-height: 16.5px;
`;

const MetricValue = styled.span`
  color: rgba(61, 37, 30, 0.55);
  font-family: "Noto Sans KR", sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: 16.5px;
`;

const BodyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  align-self: stretch;
  margin-top: 14px;
  margin-bottom: 12px;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const CostStructureCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 16px 20px;
  border-radius: 14px;
  border: 0.8px solid rgba(61, 37, 30, 0.08);
  background: #F2EEE7; /* TODO: theme.js에 없는 값 */
`;

const CostStructureHeader = styled.p`
  margin: 0;

  color: #3D251E; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif;
  font-size: 13px;
  font-weight: 700;
  line-height: 19.5px;
`;

const CostStructureHeaderSub = styled.span`
  color: rgba(61, 37, 30, 0.55);
  font-size: 12px;
  font-weight: 400;
`;

const CostStructureBar = styled.div`
  display: flex;
  align-self: stretch;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
`;

const CostStructureBarSegment = styled.div`
  height: 100%;
`;

const CostItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CostItem = styled.div`
  display: grid;
  grid-template-columns: 8px auto auto 1fr auto auto;
  align-items: center;
  gap: 8px;
`;

const CostItemDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 2px;
`;

const CostItemName = styled.span`
  color: #3D251E; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif;
  font-size: 12px;
  font-weight: 600;
`;

const CostItemAmount = styled.span`
  color: rgba(61, 37, 30, 0.55);
  font-size: 11px;
`;

const CostItemBarTrack = styled.div`
  height: 5px;
  border-radius: 999px;
  background: rgba(61, 37, 30, 0.08);
  overflow: hidden;
`;

const CostItemBarFill = styled.div`
  height: 100%;
`;

const CostItemRatio = styled.span`
  color: #3D251E; /* TODO: theme.js에 없는 값 */
  font-size: 12px;
  font-weight: 700;
  text-align: right;
`;

const CostItemStatus = styled.span`
  color: rgba(61, 37, 30, 0.45);
  font-size: 10px;
  white-space: nowrap;
`;

const InsightCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-self: stretch;

  padding: 14px 18px;
  border-radius: 14px;
  border: 0.8px solid ${({ $type }) => ($type === "WARNING" ? "#FDE68A" : "#A7F3D0")};
  background: ${({ $type }) => ($type === "WARNING" ? "#FFFBEB" : "#ECFDF5")}; /* TODO: theme.js에 없는 값 */
`;

const InsightHeader = styled.p`
  margin: 0;

  color: ${({ $color }) => $color};
  font-family: "Noto Sans KR", sans-serif;
  font-size: 12.5px;
  font-weight: 800;
`;

const InsightContent = styled.p`
  margin: 0;
  margin-top: ${({ $withTitle }) => ($withTitle ? "0" : "0")};

  color: ${({ $color }) => $color};
  font-family: "Noto Sans KR", sans-serif;
  font-size: 11.5px;
  font-weight: 400;
  line-height: 1.6;
`;

const InsightActionLink = styled.button`
  align-self: flex-start;
  margin-top: 4px;

  border: none;
  background: none;
  padding: 0;

  color: #92400E; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
`;

const SimulationCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 16px 20px;
  border-radius: 14px;
  border: 0.8px solid rgba(61, 37, 30, 0.08);
  background: #F2EEE7; /* TODO: theme.js에 없는 값 */
`;

const SimulationHeader = styled.p`
  margin: 0;

  color: #3D251E; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif;
  font-size: 13px;
  font-weight: 700;
  line-height: 19.5px;
`;

const SimulationBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 14px 16px;
  border-radius: 12px;
  background: #FFF; /* TODO: theme.js에 없는 값 */
`;

const SimulationTitle = styled.p`
  margin: 0;

  color: #3D251E; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif;
  font-size: 12px;
  font-weight: 700;
`;

const SimulationRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SimulationLabel = styled.span`
  color: rgba(61, 37, 30, 0.55);
  font-family: "Noto Sans KR", sans-serif;
  font-size: 11.5px;
`;

const SimulationValueGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const SimulationValue = styled.span`
  color: #3D251E; /* TODO: theme.js에 없는 값 */
  font-family: Outfit, sans-serif;
  font-size: 12.5px;
  font-weight: 700;
`;

const SimulationDiff = styled.span`
  color: #059669; /* TODO: theme.js에 없는 값 */
  font-family: Outfit, sans-serif;
  font-size: 11px;
  font-weight: 600;
`;

const SimulationFootnote = styled.p`
  margin: 0;

  color: rgba(61, 37, 30, 0.4);
  font-family: "Noto Sans KR", sans-serif;
  font-size: 10px;
`;

const ActionCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 16px 20px;
  border-radius: 14px;
  border: 0.8px solid rgba(61, 37, 30, 0.08);
  background: #F2EEE7; /* TODO: theme.js에 없는 값 */
`;

const ActionHeader = styled.p`
  margin: 0;

  color: #3D251E; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif;
  font-size: 13px;
  font-weight: 700;
  line-height: 19.5px;
`;

const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ActionItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;

  padding: 10px 14px;
  border-radius: 12px;
  background: #FFF; /* TODO: theme.js에 없는 값 */
`;

const ActionRankDot = styled.span`
  width: 8px;
  height: 8px;
  margin-top: 5px;
  flex-shrink: 0;
  border-radius: 50%;
`;

const ActionBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const ActionCategory = styled.span`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 11px;
  font-weight: 700;
`;

const ActionTask = styled.p`
  margin: 0;

  color: #3D251E; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
`;

export default AiDeepDiagnosisModal;
