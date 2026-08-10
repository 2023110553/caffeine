import styled from "styled-components";
import Button from "../../../components/Button";

function ExpenseHeader() {
  return (
    <Wrapper>
      <TitleGroup>
        <Eyebrow>2026년 8월 · 부가세 신고 준비</Eyebrow>
        <Title>지출 내역 분류</Title>
      </TitleGroup>
      <Button variant="unchecked_button" size="small">
        CSV 파일 내보내기
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0; /* 고정 영역: 줄어들지 않게 */
  padding: 16px 32px; /* TODO: design token화 */
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px; /* TODO: design token화 */
`;

const Eyebrow = styled.p`
  color: ${({ theme }) => theme.colors.txt_beige};
  font-size: 14px; /* TODO: design token화 */
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 24px; /* TODO: design token화 */
  font-weight: 700;
`;

export default ExpenseHeader;