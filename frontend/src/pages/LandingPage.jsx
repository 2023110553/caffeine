import {
  Wrapper,
  Receipt,
  Eyebrow,
  Divider,
  LedgerRow,
  ButtonRow,
  NavButton,
} from "../components/ReceiptShell";
import styled from "styled-components";
import { fadeUp } from "../components/ReceiptShell";

const TeamLine = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 4px;
  animation: ${fadeUp} 600ms ease 750ms both;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.01em;
  margin: 0;
  animation: ${fadeUp} 600ms ease 800ms both;
`;

function LandingPage() {
  return (
    <Wrapper>
      <Receipt>
        <Eyebrow>Cafe Biseo · 카페비서</Eyebrow>
        <TeamLine>멋쟁이사자처럼 동국대학교</TeamLine>
        <Title>중앙해커톤 5팀</Title>

        <Divider />

        <LedgerRow>
          <span>정산 항목</span>
          <span>상태</span>
        </LedgerRow>
        <LedgerRow>
          <span>월 마감 세무자료</span>
          <span>READY</span>
        </LedgerRow>
        <LedgerRow>
          <span>급여·원천세</span>
          <span>READY</span>
        </LedgerRow>
        <LedgerRow>
          <span>AI 세무 Q&A</span>
          <span>READY</span>
        </LedgerRow>

        <ButtonRow>
          <NavButton to="/team">팀 소개</NavButton>
          <NavButton to="/project">프로젝트 소개</NavButton>
        </ButtonRow>
      </Receipt>
    </Wrapper>
  );
}

export default LandingPage;