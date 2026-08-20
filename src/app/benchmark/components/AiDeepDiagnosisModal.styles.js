import styled from "styled-components";

// overall_summary.kpis[].status, cost_structure_diagnosis 막대색 등에 사용
export const GRADE_TONE = {
  GOOD: { bg: "#D1FAE5", text: "#065F46" },
  CAUTION: { bg: "#FEF3C7", text: "#92400E" },
  BAD: { bg: "#FEE2E2", text: "#991B1B" },
};

export const ModalHeader = styled.div`
  display: flex;
  padding: 28px 32px 20px 32px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  border-bottom: 0.8px solid rgba(61, 37, 30, 0.1);
`;

export const HeaderTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Badge = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  border-radius: 99px;
  border: 0.8px solid rgba(61, 37, 30, 0.12);
  background: #fdf9f3; /* TODO: theme.js에 없는 값 */
  padding: 3px 10px;

  color: #3d251e; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif;
  font-size: 11px;
  font-weight: 700;
  line-height: 16.5px;
  letter-spacing: 0.1px;
`;

export const Title = styled.h2`
  margin: 0;
  padding-top: 5px;

  color: #3d251e; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif;
  font-size: 20px;
  font-weight: 800;
  line-height: 24px;
  letter-spacing: -0.5px;
`;

export const SubText = styled.p`
  margin: 0;
  padding-top: 5px;

  color: rgba(61, 37, 30, 0.45);
  font-family: "Noto Sans KR", sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
`;

export const CloseButton = styled.button`
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

export const ModalBody = styled.div`
  display: flex;
  min-height: 377.9px;
  padding: 20px 32px 32px;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  align-self: stretch;
`;

export const StateText = styled.p`
  width: 100%;
  padding-top: 60px;

  color: rgba(61, 37, 30, 0.5);
  font-family: "Noto Sans KR", sans-serif;
  font-size: 13px;
  text-align: center;
`;

export const BadgeWrapper = styled.div`
  display: flex;
  padding: 1.8px 172.75px 9.5px 0;
  align-items: center;
  align-self: stretch;
`;

export const StatusCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  padding: 16px 20px;
  border-radius: 14px;
  border: 0.8px solid rgba(61, 37, 30, 0.08);
  background: #fdf9f3; /* TODO: theme.js에 없는 값 */
`;

export const StatusBadge = styled.span`
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

export const StatusDescription = styled.p`
  margin: 0;
  padding-top: 8px;

  color: #3d251e; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 20.8px;
`;

export const MetricRow = styled.div`
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  gap: 8px;

  padding-top: 14px;
  margin-top: 14px;
  border-top: 0.8px solid rgba(61, 37, 30, 0.1);
`;

export const MetricItem = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 6px;
  padding: 5px 12px;

  border-radius: 99px;
  border: 0.8px solid rgba(61, 37, 30, 0.1);
  background: #fff; /* TODO: theme.js에 없는 값 */
`;

export const MetricLabel = styled.span`
  color: rgba(61, 37, 30, 0.55);
  font-family: "Noto Sans KR", sans-serif;
  font-size: 11px;
  font-weight: 700;
  line-height: 16.5px;
`;

export const MetricBadge = styled.span`
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

export const MetricValue = styled.span`
  color: rgba(61, 37, 30, 0.55);
  font-family: "Noto Sans KR", sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: 16.5px;
`;

export const BodyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  align-self: stretch;
  margin-top: 14px;
  margin-bottom: 12px;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const CostStructureCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 16px 20px;
  border-radius: 14px;
  border: 0.8px solid rgba(61, 37, 30, 0.08);
  background: #f2eee7; /* TODO: theme.js에 없는 값 */
`;

export const CostStructureHeader = styled.p`
  margin: 0;

  color: #3d251e; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif;
  font-size: 13px;
  font-weight: 700;
  line-height: 19.5px;
`;

export const CostStructureHeaderSub = styled.span`
  color: rgba(61, 37, 30, 0.55);
  font-size: 12px;
  font-weight: 400;
`;

export const CostStructureBar = styled.div`
  display: flex;
  align-self: stretch;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
`;

export const CostStructureBarSegment = styled.div`
  height: 100%;
`;

export const CostItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CostItem = styled.div`
  display: grid;
  grid-template-columns: 8px auto auto 1fr auto auto;
  align-items: center;
  gap: 8px;
`;

export const CostItemDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 2px;
`;

export const CostItemName = styled.span`
  color: #3d251e; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif;
  font-size: 12px;
  font-weight: 600;
`;

export const CostItemAmount = styled.span`
  color: rgba(61, 37, 30, 0.55);
  font-size: 11px;
`;

export const CostItemBarTrack = styled.div`
  height: 5px;
  border-radius: 999px;
  background: rgba(61, 37, 30, 0.08);
  overflow: hidden;
`;

export const CostItemBarFill = styled.div`
  height: 100%;
`;

export const CostItemRatio = styled.span`
  color: #3d251e; /* TODO: theme.js에 없는 값 */
  font-size: 12px;
  font-weight: 700;
  text-align: right;
`;

export const CostItemStatus = styled.span`
  color: rgba(61, 37, 30, 0.45);
  font-size: 10px;
  white-space: nowrap;
`;

export const InsightCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-self: stretch;

  padding: 14px 18px;
  border-radius: 14px;
  border: 0.8px solid ${({ $type }) => ($type === "WARNING" ? "#FDE68A" : "#A7F3D0")};
  background: ${({ $type }) => ($type === "WARNING" ? "#FFFBEB" : "#ECFDF5")}; /* TODO: theme.js에 없는 값 */
`;

export const InsightHeader = styled.p`
  margin: 0;

  color: ${({ $color }) => $color};
  font-family: "Noto Sans KR", sans-serif;
  font-size: 12.5px;
  font-weight: 800;
`;

export const InsightContent = styled.p`
  margin: 0;
  margin-top: ${({ $withTitle }) => ($withTitle ? "0" : "0")};

  color: ${({ $color }) => $color};
  font-family: "Noto Sans KR", sans-serif;
  font-size: 11.5px;
  font-weight: 400;
  line-height: 1.6;
`;

export const InsightActionLink = styled.button`
  align-self: flex-start;
  margin-top: 4px;

  border: none;
  background: none;
  padding: 0;

  color: #92400e; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
`;

export const SimulationCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 16px 20px;
  border-radius: 14px;
  border: 0.8px solid rgba(61, 37, 30, 0.08);
  background: #f2eee7; /* TODO: theme.js에 없는 값 */
`;

export const SimulationHeader = styled.p`
  margin: 0;

  color: #3d251e; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif;
  font-size: 13px;
  font-weight: 700;
  line-height: 19.5px;
`;

export const SimulationBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 14px 16px;
  border-radius: 12px;
  background: #fff; /* TODO: theme.js에 없는 값 */
`;

export const SimulationTitle = styled.p`
  margin: 0;

  color: #3d251e; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif;
  font-size: 12px;
  font-weight: 700;
`;

export const SimulationRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SimulationLabel = styled.span`
  color: rgba(61, 37, 30, 0.55);
  font-family: "Noto Sans KR", sans-serif;
  font-size: 11.5px;
`;

export const SimulationValueGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const SimulationValue = styled.span`
  color: #3d251e; /* TODO: theme.js에 없는 값 */
  font-family: Outfit, sans-serif;
  font-size: 12.5px;
  font-weight: 700;
`;

export const SimulationDiff = styled.span`
  color: #059669; /* TODO: theme.js에 없는 값 */
  font-family: Outfit, sans-serif;
  font-size: 11px;
  font-weight: 600;
`;

export const SimulationFootnote = styled.p`
  margin: 0;

  color: rgba(61, 37, 30, 0.4);
  font-family: "Noto Sans KR", sans-serif;
  font-size: 10px;
`;

export const ActionCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 16px 20px;
  border-radius: 14px;
  border: 0.8px solid rgba(61, 37, 30, 0.08);
  background: #f2eee7; /* TODO: theme.js에 없는 값 */
`;

export const ActionHeader = styled.p`
  margin: 0;

  color: #3d251e; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif;
  font-size: 13px;
  font-weight: 700;
  line-height: 19.5px;
`;

export const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ActionItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;

  padding: 10px 14px;
  border-radius: 12px;
  background: #fff; /* TODO: theme.js에 없는 값 */
`;

export const ActionRankDot = styled.span`
  width: 8px;
  height: 8px;
  margin-top: 5px;
  flex-shrink: 0;
  border-radius: 50%;
`;

export const ActionBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const ActionCategory = styled.span`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 11px;
  font-weight: 700;
`;

export const ActionTask = styled.p`
  margin: 0;

  color: #3d251e; /* TODO: theme.js에 없는 값 */
  font-family: "Noto Sans KR", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
`;
