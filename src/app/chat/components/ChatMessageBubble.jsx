import styled from "styled-components";
import ReactMarkdown from "react-markdown";

function ChatMessageBubble({ sender, text }) {
  const isBot = sender === "bot";

  return (
    <Row $isBot={isBot}>
      {isBot && <AvatarCircle>🤖</AvatarCircle>}

      <Bubble $isBot={isBot}>
        {isBot ? <ReactMarkdown>{text}</ReactMarkdown> : text}
      </Bubble>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  justify-content: ${({ $isBot }) => ($isBot ? "flex-start" : "flex-end")};
  align-items: flex-start;
  gap: 12px; /* TODO: design token화 */
`;

const AvatarCircle = styled.div`
  width: 32px; /* TODO: design token화 */
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.medium_large};
  background-color: ${({ theme }) => theme.colors.txt_brown};
`;

const Bubble = styled.div`
  max-width: 510px; /* TODO: design token화, 피그마 실측값 */
  padding: 12px 16px; /* TODO: design token화 */
  border-radius: ${({ theme }) => theme.radius.medium_large};

  background-color: ${({ theme, $isBot }) =>
    $isBot ? theme.colors.bg_gray : theme.colors.bg_brown};

  color: ${({ theme, $isBot }) =>
    $isBot ? theme.colors.txt_brown : theme.colors.txt_white};

  font-size: 14px; /* TODO: design token화 */
  line-height: 1.5;
  word-break: break-word;

  p {
    margin: 0;
  }

  p + p {
    margin-top: 8px;
  }

  ul,
  ol {
    margin: 8px 0;
    padding-left: 20px;
  }

  strong {
    font-weight: 700;
  }
`;

export default ChatMessageBubble;