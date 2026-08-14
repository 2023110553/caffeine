import styled from "styled-components";
import Button from "../../../components/Button";

function ExpenseListItem({
  transaction,
  onCategoryChange,
}) {
  const {
    id,
    icon,
    merchant,
    memo,
    date,
    amount,
    category,
  } = transaction;


  return (
    <Card>
      <CardTop>
        <TransactionInfo>
          <IconBox>{icon}</IconBox>

          <TextGroup>
            <Merchant>{merchant}</Merchant>
            <Memo>
              {memo} · {date}
            </Memo>
          </TextGroup>
        </TransactionInfo>

        {transaction.isDeemed && (
  <DeemedBadge>의제매입</DeemedBadge>
)}
      </CardTop>

      <Amount>{amount.toLocaleString()}원</Amount>

      <ButtonRow>
        <Button
          variant={
            category === "business"
              ? "checked_button_brown"
              : "unchecked_button"
          }
          size="small"
          onClick={() =>
            onCategoryChange(id, "business")
          }
        >
          {category === "business"
            ? "✓ 사업 지출"
            : "☕ 사업 지출"}
        </Button>

        <Button
          variant={
            category === "personal"
              ? "checked_button_beige"
              : "unchecked_button"
          }
          size="small"
          onClick={() =>
            onCategoryChange(id, "personal")
          }
        >
          {category === "personal"
            ? "✓ 개인 지출"
            : "👤 개인 지출"}
        </Button>
      </ButtonRow>
    </Card>
  );
}

const Card = styled.div`
  width: 100%;
  min-width: 295.2px;
  height: auto;
  flex-shrink: 0;
  align-self: start;

  display: flex;
  flex-direction: column;

  padding: 16px;

  background-color: ${({ theme }) =>
    theme.colors.card_white};

  border: 1px solid rgba(61, 37, 30, 0.07);
  border-radius: 16px;

  box-shadow:
    0 1px 2px rgba(61, 37, 30, 0.07),
    0 0 0 rgba(61, 37, 30, 0.05);
`;

const CardTop = styled.div`
  width: 100%;
  height: 40px;
  flex-shrink: 0;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const TransactionInfo = styled.div`
  min-width: 0;

  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconBox = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #3d251e;
  background-color: #f2ebe4;

  border-radius: 12px;

  font-family: "Outfit", sans-serif;
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.75rem;
`;

const TextGroup = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Merchant = styled.p`
  max-width: 150px;
  overflow: hidden;

  color: ${({ theme }) =>
    theme.colors.txt_brown};

  font-family: "Outfit", sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.09375rem;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Memo = styled.p`
  max-width: 150px;
  padding-top: 2px;
  overflow: hidden;

  color: ${({ theme }) =>
    theme.colors.txt_beige};

  font-family: "Outfit", sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BADGE_COLOR = {
  business: {
    bg: "bg_brown",
    text: "txt_white",
  },
  personal: {
    bg: "bg_beige",
    text: "txt_brown",
  },
};

const CategoryBadge = styled.span`
  flex-shrink: 0;
  padding: 2px 8px;

  color: ${({ theme, $variant }) =>
    theme.colors[BADGE_COLOR[$variant].text]};

  background-color: ${({ theme, $variant }) =>
    theme.colors[BADGE_COLOR[$variant].bg]};

  border-radius: 16px;

  font-family: "Outfit", sans-serif;
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1rem;

  white-space: nowrap;
`;

const Amount = styled.p`
  flex-shrink: 0;
  padding-top: 12px;

  color: ${({ theme }) =>
    theme.colors.txt_brown};

  font-family: "Outfit", sans-serif;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;

  white-space: nowrap;
`;

const ButtonRow = styled.div`
  width: 100%;
  height: 44px;
  flex-shrink: 0;

  display: flex;
  align-items: flex-end;
  gap: 8px;

  margin-top: auto;
  padding-top: 12px;

  > button {
    width: auto;
    min-width: 0;
    height: 32px;
    flex: 1;

    padding: 8px 0;
    border-radius: 12px;
  }
`;
const DeemedBadge = styled.span`
  flex-shrink: 0;
  padding: 2px 8px;

  color: #2E6B47;
  background: #E8F2EC;

  border-radius: 6px;

  font-family: "Outfit";
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1rem;

  white-space: nowrap;
`;

export default ExpenseListItem;