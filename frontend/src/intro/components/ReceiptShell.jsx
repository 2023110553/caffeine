import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const printDown = keyframes`
  from { clip-path: inset(0 0 100% 0); }
  to { clip-path: inset(0 0 0% 0); }
`;

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Wrapper = styled.main`
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
    120% 120% at 50% 0%,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.backgroundDeep} 100%
  );
  padding: 48px 20px;
`;

export const Receipt = styled.section`
  position: relative;
  width: min(360px, 100%);
  background: ${({ theme }) => theme.colors.paper};
  color: ${({ theme }) => theme.colors.ink};
  padding: 36px 28px 44px;
  transform: rotate(-1.4deg);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
  animation: ${printDown} 900ms cubic-bezier(0.22, 1, 0.36, 1) both;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -14px;
    height: 14px;
    background: repeating-linear-gradient(
      -45deg,
      ${({ theme }) => theme.colors.paper} 0 8px,
      transparent 8px 16px
    );
  }
`;

export const Eyebrow = styled.p`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.muted};
  text-transform: uppercase;
  margin: 0 0 6px;
  animation: ${fadeUp} 600ms ease 700ms both;
`;

export const Divider = styled.div`
  border-top: 1px dashed ${({ theme }) => theme.colors.line};
  margin: 18px 0;
`;

export const LedgerRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 8px;
  animation: ${fadeUp} 600ms ease 850ms both;

  span:last-child {
    color: ${({ theme }) => theme.colors.ledger};
    font-weight: 500;
  }
`;

export const ButtonRow = styled.nav`
  display: flex;
  margin-top: 22px;
  border-top: 1px dashed ${({ theme }) => theme.colors.line};
  padding-top: 18px;
  animation: ${fadeUp} 600ms ease 950ms both;
`;

export const NavButton = styled(Link)`
  flex: 1;
  text-align: center;
  font-family: "JetBrains Mono", monospace;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.ink};
  text-decoration: none;
  padding: 10px 4px;
  border: 1px solid ${({ theme }) => theme.colors.ink};
  border-radius: ${({ theme }) => theme.radius.small};
  transition: background 150ms ease, color 150ms ease;

  &:first-child {
    margin-right: 10px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background};
  }
`;

export const ItemBlock = styled.div`
  padding: 12px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.line};
  animation: ${fadeUp} 500ms ease both;

  &:last-child {
    border-bottom: none;
  }
`;

export const ItemHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
`;

export const ItemName = styled.span`
  font-weight: 600;
  font-size: 14px;
`;

export const ItemRole = styled.span`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.background};
  background: ${({ theme }) => theme.colors.accent};
  padding: 2px 7px;
  border-radius: ${({ theme }) => theme.radius.small};
  white-space: nowrap;
`;

export const ItemSpec = styled.p`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.muted};
  margin: 4px 0 0;
  line-height: 1.6;
`;

export const ItemDesc = styled.p`
  font-size: 12px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted};
  margin: 6px 0 0;
`;

export const StampBadge = styled.span`
  display: inline-block;
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.ledger};
  border: 1px solid ${({ theme }) => theme.colors.ledger};
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.radius.small};
  transform: rotate(-3deg);
`;