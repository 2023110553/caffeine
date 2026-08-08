import { Link } from "react-router-dom";
import styled from "styled-components";
import { TEAM } from "../data/team";
import {
  Wrapper,
  Receipt,
  Eyebrow,
  Divider,
  ItemHead,
  ItemName,
  ItemRole,
  ItemSpec,
  fadeUp,
} from "../components/ReceiptShell";

function TeamPage() {
  return (
    <Wrapper>
      <Receipt>
        <Eyebrow>Staff List</Eyebrow>
        <Title>팀 소개</Title>
        <SubText>카페비서를 만드는 사람들 · 눌러서 자세히 보기</SubText>

        <Divider />

        {TEAM.map(({ id, name, role, department, meta, email }) => (
          <ItemLink to={`/team/${id}`} key={id}>
            <ItemHead>
              <ItemName>{name}</ItemName>
              {role && <ItemRole>{role}</ItemRole>}
            </ItemHead>
            {(department || meta || email) && (
              <ItemSpec>
                {[department, meta, email].filter(Boolean).join(" · ")}
              </ItemSpec>
            )}
          </ItemLink>
        ))}

        <BackLink to="/">← 처음으로</BackLink>
      </Receipt>
    </Wrapper>
  );
}

export default TeamPage;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px;
  animation: ${fadeUp} 600ms ease 750ms both;
`;

const SubText = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
  animation: ${fadeUp} 600ms ease 800ms both;
`;

const ItemLink = styled(Link)`
  display: block;
  padding: 12px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.line};
  text-decoration: none;
  color: inherit;
  animation: ${fadeUp} 500ms ease both;

  &:last-child {
    border-bottom: none;
  }

  &:hover ${ItemName} {
    color: ${({ theme }) => theme.colors.accent};
  }
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

