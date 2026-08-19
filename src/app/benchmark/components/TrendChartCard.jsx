import { useMemo, useState } from "react";
import styled, { useTheme } from "styled-components";
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const TABS = [
  { key: "PROFIT_LOSS", label: "전체 손익" },
  { key: "RAW_MATERIAL", label: "식자재 원가율" },
  { key: "PAYROLL", label: "인건비 추이" },
];

const toManwon = (won) => Math.round(won / 10000);

// "2026-08" -> "8월"
const toMonthLabel = (yearMonth) => `${parseInt(yearMonth.slice(5, 7), 10)}월`;

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <TooltipBox>
      <TooltipMonth>{label}</TooltipMonth>
      {payload.map((entry) => (
        <TooltipRow key={entry.dataKey}>
          {entry.name} {entry.value.toLocaleString()}{entry.dataKey === "ratio" ? "%" : "만원"}
        </TooltipRow>
      ))}
    </TooltipBox>
  );
}

function TrendChartCard({ monthlyTrends = [] }) {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("PROFIT_LOSS");

  const profitLossData = useMemo(
    () => monthlyTrends.map((item) => ({
      month: toMonthLabel(item.month),
      revenue: toManwon(item.revenue),
      profit: toManwon(item.profit),
    })),
    [monthlyTrends]
  );

  const rawMaterialData = useMemo(
    () => monthlyTrends.map((item) => ({
      month: toMonthLabel(item.month),
      ratio: item.my_raw_material_ratio,
    })),
    [monthlyTrends]
  );

  const laborData = useMemo(
    () => monthlyTrends.map((item) => ({
      month: toMonthLabel(item.month),
      ratio: item.my_labor_ratio,
    })),
    [monthlyTrends]
  );

  const rangeLabel = monthlyTrends.length
    ? `(${toMonthLabel(monthlyTrends[0].month)} ~ ${toMonthLabel(monthlyTrends[monthlyTrends.length - 1].month)})`
    : "";

  const avgRevenue = profitLossData.length
    ? Math.round(profitLossData.reduce((sum, d) => sum + d.revenue, 0) / profitLossData.length)
    : 0;
  const avgProfit = profitLossData.length
    ? (profitLossData.reduce((sum, d) => sum + d.profit, 0) / profitLossData.length).toFixed(1)
    : "0.0";

  const activeData =
    activeTab === "PROFIT_LOSS" ? profitLossData
      : activeTab === "RAW_MATERIAL" ? rawMaterialData
        : laborData;

  return (
    <Card>
      <Title>최근 6개월 매출 및 영업이익 추이 {rangeLabel}</Title>

      <TabRow>
        {TABS.map((tab) => (
          <TabButton key={tab.key} type="button" $active={activeTab === tab.key} onClick={() => setActiveTab(tab.key)}>
            {tab.label}
          </TabButton>
        ))}
      </TabRow>

      <ChartWrapper>
        <ResponsiveContainer width="100%" height={220}>
          {activeTab === "PROFIT_LOSS" ? (
            <ComposedChart data={activeData}>
              <CartesianGrid stroke="rgba(61, 37, 30, 0.08)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "rgba(61, 37, 30, 0.45)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "rgba(61, 37, 30, 0.4)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}만`} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="revenue" name="매출" fill="#c97b3a" radius={[4, 4, 0, 0]} barSize={28} />
              <Line dataKey="profit" name="영업이익" stroke={theme.colors.txt_brown} strokeWidth={2} dot={{ r: 3 }} />
            </ComposedChart>
          ) : (
            <ComposedChart data={activeData}>
              <CartesianGrid stroke="rgba(61, 37, 30, 0.08)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "rgba(61, 37, 30, 0.45)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "rgba(61, 37, 30, 0.4)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<ChartTooltip />} />
              <Line
                dataKey="ratio"
                name={activeTab === "RAW_MATERIAL" ? "식자재 원가율" : "인건비 비중"}
                stroke={activeTab === "RAW_MATERIAL" ? "#c97b3a" : theme.colors.txt_brown}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </ChartWrapper>

      {activeTab === "PROFIT_LOSS" && (
        <LegendRow>
          <LegendItem>
            <Dot style={{ backgroundColor: "#c97b3a" }} /> 매출
          </LegendItem>
          <LegendItem>
            <Dot style={{ backgroundColor: theme.colors.txt_brown }} /> 영업이익
          </LegendItem>
        </LegendRow>
      )}

      <StatsRow>
        <StatItem>
          <StatLabel>6개월 평균 매출</StatLabel>
          <StatValue>{avgRevenue.toLocaleString()}만 원</StatValue>
        </StatItem>
        <Divider />
        <StatItem>
          <StatLabel>6개월 평균 영업이익</StatLabel>
          <StatValue>{avgProfit}만 원</StatValue>
        </StatItem>
      </StatsRow>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px; /* TODO: design token화 */
  background-color: ${({ theme }) => theme.colors.card_white};
  border: 0.8px solid rgba(61, 37, 30, 0.1);
  border-radius: ${({ theme }) => theme.radius.large};
  padding: 20px 22px; /* TODO: design token화 */
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-weight: 800;
  font-size: 13px; /* TODO: design token화 */
  letter-spacing: -0.2px;
`;

const TabRow = styled.div`
  display: flex;
  gap: 6px; /* TODO: design token화 */
`;

const TabButton = styled.button`
  border: 0.8px solid rgba(61, 37, 30, 0.1);
  border-radius: 999px;
  padding: 5px 12px; /* TODO: design token화 */
  font-size: 11px; /* TODO: design token화 */
  font-weight: 600;
  cursor: pointer;
  background-color: ${({ theme, $active }) => ($active ? theme.colors.bg_brown : "transparent")};
  color: ${({ theme, $active }) => ($active ? theme.colors.txt_white : "rgba(61, 37, 30, 0.55)")};
`;

const ChartWrapper = styled.div`
  width: 100%;
`;

const LegendRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px; /* TODO: design token화 */
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px; /* TODO: design token화 */
  color: rgba(61, 37, 30, 0.45); /* TODO: theme.js에 없는 값 */
  font-size: 11px; /* TODO: design token화 */
`;

const Dot = styled.span`
  width: 8px; /* TODO: design token화 */
  height: 8px;
  border-radius: 2px;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 16px; /* TODO: design token화 */
  padding-top: 10px; /* TODO: design token화 */
  border-top: 0.8px solid rgba(61, 37, 30, 0.1);
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px; /* TODO: design token화 */
  align-items: center;
`;

const Divider = styled.div`
  width: 1px;
  align-self: stretch;
  background-color: rgba(61, 37, 30, 0.1);
`;

const StatLabel = styled.span`
  color: rgba(61, 37, 30, 0.4); /* TODO: theme.js에 없는 값 */
  font-size: 10px; /* TODO: design token화 */
`;

const StatValue = styled.span`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 13px; /* TODO: design token화 */
  font-weight: 800;
`;

const TooltipBox = styled.div`
  background-color: ${({ theme }) => theme.colors.txt_brown};
  color: ${({ theme }) => theme.colors.txt_white};
  border-radius: ${({ theme }) => theme.radius.medium};
  padding: 8px 12px; /* TODO: design token화 */
  font-size: 11px; /* TODO: design token화 */
`;

const TooltipMonth = styled.p`
  font-weight: 700;
  margin-bottom: 4px; /* TODO: design token화 */
`;

const TooltipRow = styled.p`
  opacity: 0.9;
`;

export default TrendChartCard;
