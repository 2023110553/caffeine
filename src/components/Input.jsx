import styled from "styled-components";

function Input({ label, error, unit, ...props }) {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <InputRow>
        <StyledInput $hasError={!!error} {...props} />
        {unit && <Unit>{unit}</Unit>}
      </InputRow>
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px; /* TODO: design token화 */
`;

const Label = styled.label`
  font-size: 14px; /* TODO: design token화 */
  color: ${({ theme }) => theme.colors.txt_beige};
`;

const InputRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px 12px; /* TODO: design token화 */
  border-radius: ${({ theme }) => theme.radius.small};
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.bg_gray)};
  background-color: ${({ theme }) => theme.colors.bg_white};
  color: ${({ theme }) => theme.colors.txt_brown};
`;

const Unit = styled.span`
  position: absolute;
  right: 12px; /* TODO: design token화 */
  color: ${({ theme }) => theme.colors.txt_beige};
  font-size: 14px; /* TODO: design token화 */
`;

const ErrorText = styled.span`
  font-size: 12px; /* TODO: design token화 */
  color: ${({ theme }) => theme.colors.error};
`;

export default Input;