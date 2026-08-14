import styled from "styled-components";

const QUESTIONS = ["부가세 절세 방법", "원천세 납부일", "공제 항목 확인", "지출 분류 방법"];

function SuggestedQuestions({ onSelect, disabled }) {
  return (
    <Wrapper>
      {QUESTIONS.map((q) => (
        <Chip key={q} onClick={() => onSelect(q)} disabled={disabled}>
          {q}
        </Chip>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 8px; /* TODO: design token화 */
  flex-wrap: wrap;
`;

const Chip = styled.button`
  border: none;
  border-radius: 26843500px;
  background-color: ${({ theme }) => theme.colors.bg_gray};
  color: ${({ theme }) => theme.colors.txt_brown};
  padding: 10px 14px; /* TODO: design token화 */
  font-size: 13px; /* TODO: design token화 */
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default SuggestedQuestions;