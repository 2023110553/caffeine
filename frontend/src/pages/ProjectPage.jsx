import { Link } from "react-router-dom";
import styled from "styled-components";
import { FEATURES, TECH_STACK } from "../data/features";
import {
  Wrapper,
  Receipt,
  Eyebrow,
  Divider,
  ItemBlock,
  ItemHead,
  ItemName,
  ItemRole,
  ItemDesc,
  StampBadge,
  fadeUp,
} from "../components/ReceiptShell";


function ProjectPage() {
  return (
    <Wrapper>
      <Receipt>
        <Eyebrow>Project Overview</Eyebrow>
        <Title>카페비서</Title>
        <Tagline>카페 사장님의 세무를 도와주는 서비스</Tagline>

        <Problem>
          소형 카페 사장님은 매달 세무사에게 기장료를 내면서도, 정작 자기
          매장의 매출·매입이 어떻게 정리되는지는 잘 모릅니다. 카페비서는
          홈택스 데이터를 자동으로 모아 정리하고, 세무사에게 전달할 자료까지
          한 번에 만들어 드립니다.
        </Problem>

        <Divider />

        <SectionLabel>Core Features</SectionLabel>
        {FEATURES.map(({ id, name, tag, desc }) => (
          <ItemBlock key={id}>
            <ItemHead>
              <ItemName>{name}</ItemName>
              <ItemRole>{tag}</ItemRole>
            </ItemHead>
            <ItemDesc>{desc}</ItemDesc>
          </ItemBlock>
        ))}

        <Divider />

        <SectionLabel>Tech Stack</SectionLabel>
        <StackRow>
          {TECH_STACK.map((tech) => (
            <ItemRole key={tech}>{tech}</ItemRole>
          ))}
        </StackRow>

        <StampWrap>
          <StampBadge>MVP READY</StampBadge>
        </StampWrap>

        <BackLink to="/">← 처음으로</BackLink>
      </Receipt>
    </Wrapper>
  );
}

export default ProjectPage;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 4px;
  animation: ${fadeUp} 600ms ease 750ms both;
`;

const Tagline = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
  animation: ${fadeUp} 600ms ease 800ms both;
`;

const Problem = styled.p`
  font-size: 13px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.ink};
  margin: 14px 0 0;
  animation: ${fadeUp} 600ms ease 820ms both;
`;

const SectionLabel = styled.p`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 10px;
`;

const StackRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const StampWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }
`;
