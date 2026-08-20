import { useState } from "react";
import { useTheme } from "styled-components";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  Title,
  TabRow,
  TabButton,
  ChartWrapper,
  LegendRow,
  LegendItem,
  Dot,
  StatsRow,
  StatItem,
  Divider,
  StatLabel,
  StatValue,
  TooltipBox,
  TooltipMonth,
  TooltipRow,
  LineDot,
  TrendStatus,
} from "./TrendChartCard.styles";

const TABS = [
  { key: "PROFIT_LOSS", label: "전체 손익" },
  { key: "RAW_MATERIAL", label: "식자재 원가율" },
  { key: "PAYROLL", label: "인건비 추이" },
];

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <TooltipBox>
      <TooltipMonth>{label}</TooltipMonth>

      {payload.map((entry) => (
        <TooltipRow key={entry.dataKey}>
          {entry.name} {entry.value.toLocaleString()}
          {entry.dataKey === "ratio" ? "%" : "만원"}
        </TooltipRow>
      ))}
    </TooltipBox>
  );
}

function TrendChartCard({ monthlyTrends = [] }) {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("PROFIT_LOSS");

  // API 데이터 → 차트에서 사용하는 형태로 변환
  const profitLossTrend = monthlyTrends.map((item) => ({
    month: `${Number(item.month.split("-")[1])}월`,
    revenue: Math.round(item.revenue / 10000),
    profit: Math.round(item.profit / 10000),
  }));

  const rawMaterialTrend = monthlyTrends.map((item) => ({
    month: `${Number(item.month.split("-")[1])}월`,
    ratio: item.my_raw_material_ratio,
  }));

  const laborTrend = monthlyTrends.map((item) => ({
    month: `${Number(item.month.split("-")[1])}월`,
    ratio: item.my_labor_ratio,
  }));

  const startMonth = profitLossTrend.at(0)?.month ?? "";
  const endMonth = profitLossTrend.at(-1)?.month ?? "";

  // 전체 손익 평균
  const avgRevenue =
    profitLossTrend.length === 0
      ? 0
      : Math.round(
          profitLossTrend.reduce((sum, item) => sum + item.revenue, 0) / profitLossTrend.length,
        );

  const avgProfit =
    profitLossTrend.length === 0
      ? "0.0"
      : (
          profitLossTrend.reduce((sum, item) => sum + item.profit, 0) / profitLossTrend.length
        ).toFixed(1);

  // 식자재 평균
  const avgRawMaterial =
    rawMaterialTrend.length === 0
      ? 0
      : (
          rawMaterialTrend.reduce((sum, item) => sum + item.ratio, 0) / rawMaterialTrend.length
        ).toFixed(1);

  // 인건비 평균
  const avgLabor =
    laborTrend.length === 0
      ? 0
      : (laborTrend.reduce((sum, item) => sum + item.ratio, 0) / laborTrend.length).toFixed(1);

  // 현재 달
  const currentRawMaterial = rawMaterialTrend.at(-1)?.ratio ?? 0;
  const currentLabor = laborTrend.at(-1)?.ratio ?? 0;

  // 최저 / 최고
  const rawMin =
    rawMaterialTrend.length === 0 ? 0 : Math.min(...rawMaterialTrend.map((item) => item.ratio));

  const rawMax =
    rawMaterialTrend.length === 0 ? 0 : Math.max(...rawMaterialTrend.map((item) => item.ratio));

  const laborMin = laborTrend.length === 0 ? 0 : Math.min(...laborTrend.map((item) => item.ratio));

  const laborMax = laborTrend.length === 0 ? 0 : Math.max(...laborTrend.map((item) => item.ratio));

  const isRawMaterial = activeTab === "RAW_MATERIAL";

  const currentRatio = isRawMaterial ? currentRawMaterial : currentLabor;

  const averageRatio = isRawMaterial ? Number(avgRawMaterial) : Number(avgLabor);

  const minRatio = isRawMaterial ? rawMin : laborMin;
  const maxRatio = isRawMaterial ? rawMax : laborMax;

  // 현재 달이 6개월 평균보다 높으면 점검 필요
  const needsCheck = currentRatio > averageRatio;

  return (
    <Card>
      <Title>
        최근 6개월 매출 및 영업이익 추이 ({startMonth} ~ {endMonth})
      </Title>

      <TabRow>
        {TABS.map((tab) => (
          <TabButton
            key={tab.key}
            type="button"
            $active={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabRow>

      <ChartWrapper>
        <ResponsiveContainer width="100%" height={220}>
          {activeTab === "PROFIT_LOSS" ? (
            <ComposedChart data={profitLossTrend}>
              <CartesianGrid stroke="rgba(61, 37, 30, 0.08)" vertical={false} />

              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 11,
                  fill: "rgba(61, 37, 30, 0.45)",
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 10,
                  fill: "rgba(61, 37, 30, 0.4)",
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}만`}
              />

              <Tooltip content={<ChartTooltip />} />

              <Bar
                dataKey="revenue"
                name="매출"
                fill="#c97b3a"
                radius={[4, 4, 0, 0]}
                barSize={28}
              />

              <Line
                dataKey="profit"
                name="영업이익"
                stroke={theme.colors.txt_brown}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </ComposedChart>
          ) : (
            <ComposedChart data={activeTab === "RAW_MATERIAL" ? rawMaterialTrend : laborTrend}>
              <CartesianGrid stroke="rgba(61, 37, 30, 0.08)" vertical={false} />

              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 11,
                  fill: "rgba(61, 37, 30, 0.45)",
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                domain={activeTab === "RAW_MATERIAL" ? [0, 20] : [15, 35]}
                ticks={activeTab === "RAW_MATERIAL" ? [0, 5, 10, 15, 20] : [15, 20, 25, 30, 35]}
                tick={{
                  fontSize: 10,
                  fill: "rgba(61, 37, 30, 0.4)",
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
              />

              <Tooltip content={<ChartTooltip />} />

              <Line
                dataKey="ratio"
                name={activeTab === "RAW_MATERIAL" ? "식자재 원가율" : "인건비 비중"}
                stroke={activeTab === "RAW_MATERIAL" ? "#c97b3a" : "#2E7D52"}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </ChartWrapper>

      <LegendRow>
        {activeTab === "PROFIT_LOSS" && (
          <>
            <LegendItem>
              <Dot $color="#c97b3a" />
              매출
            </LegendItem>

            <LegendItem>
              <LineDot $color={theme.colors.txt_brown} />
              영업이익
            </LegendItem>
          </>
        )}

        {activeTab === "RAW_MATERIAL" && (
          <LegendItem $color="#c97b3a">
            <LineDot $color="#c97b3a" />
            식자재 원가율
          </LegendItem>
        )}

        {activeTab === "PAYROLL" && (
          <LegendItem $color="#2e7d52">
            <LineDot $color="#2e7d52" />
            인건비 추이
          </LegendItem>
        )}
      </LegendRow>

      <StatsRow>
        {activeTab === "PROFIT_LOSS" ? (
          <>
            <StatItem>
              <StatLabel>6개월 평균 매출</StatLabel>
              <StatValue>{avgRevenue.toLocaleString()}만 원</StatValue>
            </StatItem>

            <Divider />

            <StatItem>
              <StatLabel>6개월 평균 영업이익</StatLabel>
              <StatValue>{avgProfit}만 원</StatValue>
            </StatItem>
          </>
        ) : (
          <>
            <StatItem>
              <StatLabel>6개월 평균 비율</StatLabel>
              <StatValue>{averageRatio}%</StatValue>
            </StatItem>

            <Divider />

            <StatItem>
              <StatLabel>최저 vs 최고월</StatLabel>
              <TrendStatus $type={activeTab}>
                {minRatio}% vs {maxRatio}%
              </TrendStatus>
            </StatItem>

            <Divider />

            <StatItem>
              <StatLabel>변동 추이</StatLabel>
              <TrendStatus $type={activeTab}>
                {needsCheck ? "▲ 점검 필요" : "▼ 안정적 관리 중"}
              </TrendStatus>
            </StatItem>
          </>
        )}
      </StatsRow>
    </Card>
  );
}

export default TrendChartCard;
