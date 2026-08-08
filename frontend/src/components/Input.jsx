import styled from "styled-components";

function Input({ label, error, ...props }) {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <StyledInput $hasError={!!error} {...props} />
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
  color: ${({ theme }) => theme.colors.muted};
`;

const StyledInput = styled.input`
  padding: 8px 12px; /* TODO: design token화 */
  border-radius: ${({ theme }) => theme.radius.small};
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.line)};
  background-color: ${({ theme }) => theme.colors.paper};
  color: ${({ theme }) => theme.colors.ink};
`;

const ErrorText = styled.span`
  font-size: 12px; /* TODO: design token화 */
  color: ${({ theme }) => theme.colors.error};
`;

export default Input;