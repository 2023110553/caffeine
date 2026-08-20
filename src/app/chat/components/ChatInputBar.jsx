import { useState } from "react";
import styled from "styled-components";
import SuggestedQuestions from "./SuggestedQuestions";

function ChatInputBar({ onSend, disabled }) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Wrapper>
      <SuggestedQuestions onSelect={onSend} disabled={disabled} />
      <InputRow>
        <TextInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="세무 질문을 입력하세요..."
          disabled={disabled}
        />
        <SendButton onClick={handleSubmit} disabled={disabled || !value.trim()}>
          ➤
        </SendButton>
      </InputRow>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 12px; /* TODO: design token화 */
  padding: 16px 32px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.bg_gray};
`;

const InputRow = styled.div`
  display: flex;
  gap: 8px; /* TODO: design token화 */
`;

const TextInput = styled.input`
  flex: 1;
  min-width: 0;
  border: 1px solid ${({ theme }) => theme.colors.bg_gray};
  border-radius: ${({ theme }) => theme.radius.medium_large};
  padding: 12px 16px; /* TODO: design token화 */
  font-size: 14px; /* TODO: design token화 */
  color: ${({ theme }) => theme.colors.txt_brown};

  &:disabled {
    opacity: 0.6;
  }
`;

const SendButton = styled.button`
  width: 40px; /* TODO: design token화 */
  height: 40px;
  flex-shrink: 0;
  border: none;
  border-radius: ${({ theme }) => theme.radius.medium_large};
  background-color: ${({ theme }) => theme.colors.bg_brown};
  color: ${({ theme }) => theme.colors.txt_white};
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default ChatInputBar;
