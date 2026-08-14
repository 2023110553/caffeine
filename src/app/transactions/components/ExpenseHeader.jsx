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
      <CsvArea>
        <CsvButton variant="unchecked_button" size="small">
          CSV 파일 내보내기
          <img src={notice} alt="" />
        </CsvButton>

        <Tooltip>
          부가가치세/종합소득세 세금신고 때 세무사에게 이 파일을 보내면 더
          정확한 세무 도움을 받을 수 있어요!
        </Tooltip>
      </CsvArea>
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
  background: #fdf9f3;
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

const CsvArea = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  &:hover > div {
    display: inline-flex;
  }
`;

const CsvButton = styled(Button)`
  width: 141px;
  height: 36px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 8px;

  color: #3d251e;
  text-align: center;
  font-family: Outfit;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */

  img {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
  }
`;

const Tooltip = styled.div`
  box-sizing: border-box;

  position: absolute;
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);

  display: inline-flex;
padding: 5px;
justify-content: center;
align-items: center;
gap: 10px;

display: none;

border-radius: var(--Font-size-40, 40px);
background: var(--Neutral-Surface-Card, #FFF);

color: #3D251E;
font-family: Outfit;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: 16px; /* 133.333% */
  white-space: nowrap;
`;

export default ExpenseHeader;
