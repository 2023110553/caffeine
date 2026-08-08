import { Link, useParams, Navigate } from "react-router-dom";
import styled from "styled-components";
import { TEAM } from "../data/team";
import {
  Wrapper,
  Receipt,
  Eyebrow,
  Divider,
  fadeUp,
} from "../components/ReceiptShell";

function TeamMemberPage() {
  const { memberId } = useParams();
  const member = TEAM.find((person) => person.id === memberId);

  if (!member) {
    return <Navigate to="/team" replace />;
  }

  const { name, role, department, meta, email, photo, intro } = member;

  return (
    <Wrapper>
      <Receipt>
        <Eyebrow>Staff Detail</Eyebrow>

        <Photo>
          <img src={photo} alt={`${name} 프로필 사진`} /> 
        </Photo>

        <Name>{name}</Name>
        {role && <Role>{role}</Role>}

        <Divider />

        {department && (
          <InfoRow>
            <span>학과</span>
            <span>{department}</span>
          </InfoRow>
        )}
        {meta && (
          <InfoRow>
            <span>나이</span>
            <span>{meta}</span>
          </InfoRow>
        )}
        {email && (
          <InfoRow>
            <span>이메일</span>
            <span>{email}</span>
          </InfoRow>
        )}

        {intro && <Intro>{intro}</Intro>}

        <BackLink to="/team">← 팀 목록으로</BackLink>
      </Receipt>
    </Wrapper>
  );
}

export default TeamMemberPage;

const Photo = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  background: ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radius.small};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: grayscale(0.15) contrast(1.05);
  }
`;

const Name = styled.h1`
  font-size: 22px;
  font-weight: 700;
  margin: 16px 0 2px;
  animation: ${fadeUp} 600ms ease 750ms both;
`;

const Role = styled.p`
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.accent};
  margin: 0 0 14px;
  animation: ${fadeUp} 600ms ease 800ms both;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  padding: 6px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.line};

  &:last-of-type {
    border-bottom: none;
  }
`;

const Intro = styled.p`
  font-size: 13px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.ink};
  margin: 16px 0 0;
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

