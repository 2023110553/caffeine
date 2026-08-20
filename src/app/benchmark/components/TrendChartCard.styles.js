import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  background-color: ${({ theme }) => theme.colors.card_white};
  border: 0.8px solid rgba(61, 37, 30, 0.1);
  border-radius: ${({ theme }) => theme.radius.large};

  padding: 20px 22px;
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-weight: 800;
  font-size: 13px;
  letter-spacing: -0.2px;
`;

export const TabRow = styled.div`
  display: flex;
  gap: 6px;
`;

export const TabButton = styled.button`
  border: 0.8px solid rgba(61, 37, 30, 0.1);
  border-radius: 999px;

  padding: 5px 12px;

  font-size: 11px;
  font-weight: 600;

  cursor: pointer;

  background-color: ${({ theme, $active }) => ($active ? theme.colors.bg_brown : "transparent")};

  color: ${({ theme, $active }) => ($active ? theme.colors.txt_white : "rgba(61, 37, 30, 0.55)")};
`;

export const ChartWrapper = styled.div`
  width: 100%;
`;

export const LegendRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  color: ${({ $color }) => $color ?? "#C97B3A"};

  font-size: 11px;
`;

export const Dot = styled.span`
  width: 8px;
  height: 8px;

  border-radius: 2px;

  background-color: ${({ $color }) => $color};
`;

export const StatsRow = styled.div`
  display: flex;
  gap: 32px;

  padding-top: 10px;

  border-top: 0.8px solid rgba(61, 37, 30, 0.1);
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  align-items: center;
`;

export const Divider = styled.div`
  width: 1px;
  align-self: stretch;

  background-color: rgba(61, 37, 30, 0.1);
`;

export const StatLabel = styled.span`
  color: rgba(61, 37, 30, 0.4);

  font-size: 10px;
`;

export const StatValue = styled.span`
  color: ${({ theme }) => theme.colors.txt_brown};

  font-size: 13px;
  font-weight: 800;
`;

export const TooltipBox = styled.div`
  background-color: ${({ theme }) => theme.colors.txt_brown};
  color: ${({ theme }) => theme.colors.txt_white};

  border-radius: ${({ theme }) => theme.radius.medium};

  padding: 8px 12px;

  font-size: 11px;
`;

export const TooltipMonth = styled.p`
  font-weight: 700;

  margin-bottom: 4px;
`;

export const TooltipRow = styled.p`
  opacity: 0.9;
`;

export const LineDot = styled.span`
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

export const TrendStatus = styled.span`
  color: ${({ $type }) => ($type === "RAW_MATERIAL" ? "#C97B3A" : "#2E7D52")};

  font-size: 13px;
  font-weight: 800;
`;
