import styled from "styled-components";

function ChatHeader() {
  return (
    <Wrapper>
      <Eyebrow>챗봇의 모든 답변은 실제 세법 조항에 근거합니다</Eyebrow>
      <Title>AI 세무 챗봇</Title>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 4px; /* TODO: design token화 */
  padding: 16px 32px;
`;

const Eyebrow = styled.p`
  color: ${({ theme }) => theme.colors.txt_beige};
  font-size: 14px; /* TODO: design token화 */
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 24px; /* TODO: design token화 */
  font-weight: 700;
  font-family: Fraunces;
  font-style: normal;
  line-height: 32px; /* 133.333% */
`;

export default ChatHeader;