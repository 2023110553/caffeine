import { useState } from "react";
import styled from "styled-components";
import { sendChatMessage } from "../../api/chat";
import ChatHeader from "./components/ChatHeader";
import ChatMessageList from "./components/ChatMessageList";
import ChatInputBar from "./components/ChatInputBar";

const WELCOME_MESSAGE = {
  id: "welcome",
  sender: "bot",
  text: "안녕하세요! 카페비서 AI 세무 챗봇입니다. 부가세, 원천세, 공제, 인건비 등 세무 관련 궁금한 것에 대해 질문해 주세요.",
};

function ChatPage() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (text) => {
    if (!text.trim() || isSending) return;

    const userMessage = { id: Date.now(), sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setIsSending(true);

    try {
      const res = await sendChatMessage({ message: text });
      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        // TODO: 실제 응답 필드명 백엔드와 확인 필요 (임시로 res.data.answer 가정)
        text: res.data.answer,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: "답변을 가져오지 못했어요. 잠시 후 다시 시도해주세요.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Wrapper>
      <ChatHeader />
      <ChatMessageList messages={messages} isSending={isSending} />
      <ChatInputBar onSend={handleSend} disabled={isSending} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

export default ChatPage;