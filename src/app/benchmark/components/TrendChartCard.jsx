import { useState } from "react";
import styled, { useTheme } from "styled-components";
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

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  background-color: ${({ theme }) => theme.colors.card_white};
  border: 0.8px solid rgba(61, 37, 30, 0.1);
  border-radius: ${({ theme }) => theme.radius.large};

  padding: 20px 22px;
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-weight: 800;
  font-size: 13px;
  letter-spacing: -0.2px;
`;

const TabRow = styled.div`
  display: flex;
  gap: 6px;
`;

const TabButton = styled.button`
  border: 0.8px solid rgba(61, 37, 30, 0.1);
  border-radius: 999px;

  padding: 5px 12px;

  font-size: 11px;
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
  gap: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  color: ${({ $color }) => $color ?? "#C97B3A"};

  font-size: 11px;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;

  border-radius: 2px;

  background-color: ${({ $color }) => $color};
`;

const StatsRow = styled.div`
  display: flex;
  gap: 32px;

  padding-top: 10px;

  border-top: 0.8px solid rgba(61, 37, 30, 0.1);
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  align-items: center;
`;

const Divider = styled.div`
  width: 1px;
  align-self: stretch;

  background-color: rgba(61, 37, 30, 0.1);
`;

const StatLabel = styled.span`
  color: rgba(61, 37, 30, 0.4);

  font-size: 10px;
`;

const StatValue = styled.span`
  color: ${({ theme }) => theme.colors.txt_brown};

  font-size: 13px;
  font-weight: 800;
`;

const TooltipBox = styled.div`
  background-color: ${({ theme }) => theme.colors.txt_brown};
  color: ${({ theme }) => theme.colors.txt_white};

  border-radius: ${({ theme }) => theme.radius.medium};

  padding: 8px 12px;

  font-size: 11px;
`;

const TooltipMonth = styled.p`
  font-weight: 700;

  margin-bottom: 4px;
`;

const TooltipRow = styled.p`
  opacity: 0.9;
`;

const LineDot = styled.span`
  position: relative;

  width: 18px;
  height: 8px;

  &::before {
    content: "";

    position: absolute;
    top: 50%;
    left: 0;

    width: 18px;
    height: 2px;

    transform: translateY(-50%);

    background-color: ${({ $color }) => $color};
  }

  &::after {
    content: "";

    position: absolute;
    top: 50%;
    left: 50%;

    width: 7px;
    height: 7px;

    transform: translate(-50%, -50%);

    box-sizing: border-box;

    border: 1.5px solid ${({ $color }) => $color};
    border-radius: 50%;

    background-color: ${({ theme }) => theme.colors.card_white};
  }
`;

const TrendStatus = styled.span`
  color: ${({ $type }) => ($type === "RAW_MATERIAL" ? "#C97B3A" : "#2E7D52")};

  font-size: 13px;
  font-weight: 800;
`;

export default TrendChartCard;
