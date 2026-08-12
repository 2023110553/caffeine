import styled from "styled-components";
import Button from "../../../components/Button";

function ExpenseListItem({ transaction, onCategoryChange }) {
  const { id, icon, merchant, memo, date, amount, category } = transaction;
  const badgeLabel = category === "business" ? "사업" : category === "personal" ? "개인" : null;

  return (
    <Card>
      <CardTop>
        <IconCircle>{icon}</IconCircle>
        {badgeLabel && <CategoryBadge $variant={category}>{badgeLabel}</CategoryBadge>}
      </CardTop>

      <Merchant>{merchant}</Merchant>
      <Memo>{memo} · {date}</Memo>
      <Amount>{amount.toLocaleString()}원</Amount>

      <ButtonRow>
        <Button
          variant={category === "business" ? "checked_button_brown" : "unchecked_button"}
          size="small"
          onClick={() => onCategoryChange(id, "business")}
        >
          {category === "business" ? "✓ 사업 지출" : "☕ 사업 지출"}
        </Button>
        <Button
          variant={category === "personal" ? "checked_button_beige" : "unchecked_button"}
          size="small"
          onClick={() => onCategoryChange(id, "personal")}
        >
          {category === "personal" ? "✓ 개인 지출" : "👤 개인 지출"}
        </Button>
      </ButtonRow>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px; /* TODO: design token화 */
  border: 1px solid ${({ theme }) => theme.colors.bg_gray};
  border-radius: ${({ theme }) => theme.radius.large};
  padding: 16px; /* TODO: design token화 */
  background-color: ${({ theme }) => theme.colors.card_white};
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px; /* TODO: design token화 */
`;

const IconCircle = styled.div`
  width: 32px; /* TODO: design token화 */
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.bg_gray};
`;

// category별 배지 색이 필요해서 $variant로 분기 (TaxImpactPanel의 BREAKDOWN_COLOR 패턴과 동일)
const BADGE_COLOR = {
  business: { bg: "bg_brown", text: "txt_white" },
  personal: { bg: "bg_beige", text: "txt_brown" },
};

const CategoryBadge = styled.span`
  font-size: 11px; /* TODO: design token화 */
  font-weight: 600;
  padding: 2px 8px; /* TODO: design token화 */
  border-radius: ${({ theme }) => theme.radius.large};
  background-color: ${({ theme, $variant }) => theme.colors[BADGE_COLOR[$variant].bg]};
  color: ${({ theme, $variant }) => theme.colors[BADGE_COLOR[$variant].text]};
`;

const Merchant = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-weight: 600;
  font-size: 14px; /* TODO: design token화 */
`;

const Memo = styled.p`
  color: ${({ theme }) => theme.colors.txt_beige};
  font-size: 12px; /* TODO: design token화 */
`;

const Amount = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-weight: 700;
  font-size: 16px; /* TODO: design token화 */
  margin: 4px 0; /* TODO: design token화 */
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 6px; /* TODO: design token화 */
  /* ⚠️ Button.jsx가 width 고정값(small: 127.6px)이라 카드 폭에 꽉 안 참 — Button에 full-width 옵션 필요 */
`;

export default ExpenseListItem;