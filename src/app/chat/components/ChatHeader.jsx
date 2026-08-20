import styled from "styled-components";

function ChatHeader() {
  return (
    <Wrapper>
      <TitleGroup>
        <Eyebrow>챗봇의 모든 답변은 실제 세법 조항에 근거합니다</Eyebrow>
        <Title>AI 세무 챗봇</Title>
      </TitleGroup>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px; /* TODO: design token화 */
  background-color: ${({ theme }) => theme.colors.bg_white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.txt_brown}; /* TODO: 실측값 그대로 - 진한 색 구분선, 의도된 것인지 확인 필요 */
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px; /* TODO: design token화 */
`;

const Eyebrow = styled.p`
  color: ${({ theme }) => theme.colors.txt_beige};
  font-size: 12px; /* TODO: design token화 */
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
