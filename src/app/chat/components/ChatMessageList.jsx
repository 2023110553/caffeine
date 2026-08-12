import { useRef, useEffect } from "react";
import styled from "styled-components";
import ChatMessageBubble from "./ChatMessageBubble";

function ChatMessageList({ messages, isSending }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  return (
    <Wrapper>
      {messages.map((msg) => (
        <ChatMessageBubble key={msg.id} sender={msg.sender} text={msg.text} />
      ))}
      {isSending && <ChatMessageBubble sender="bot" text="답변을 작성하고 있어요..." />}
      <div ref={bottomRef} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1;
  min-height: 0; /* 스크롤 체인 */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px; /* TODO: design token화 */
  padding: 24px 32px;
`;

export default ChatMessageList;