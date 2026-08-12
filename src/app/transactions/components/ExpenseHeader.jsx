import styled from "styled-components";
import Button from "../../../components/Button";
import notice from "../../../assets/notice.png";
function ExpenseHeader() {
  return (
    <Wrapper>
      <TitleGroup>
        <Eyebrow>2026년 8월 · 부가세 신고 준비</Eyebrow>
        <Title>지출 내역 분류</Title>
      </TitleGroup>
      <Button variant="unchecked_button" size="small">
        CSV 파일 내보내기
        <img src={notice}/>
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.header`
display: flex;
padding: 16px 32px;
justify-content: space-between;
align-items: center;
align-self: stretch;
border-bottom: 0.8px solid rgba(61, 37, 30, 0.08);
background: #FDF9F3;
`;

const TitleGroup = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
`;

const Eyebrow = styled.p`
  color: ${({ theme }) => theme.colors.txt_beige};
  font-family: Outfit;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: 16px; 
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.txt_brown};
font-family: Fraunces;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 32px; /* 133.333% */
`;

export default ExpenseHeader;