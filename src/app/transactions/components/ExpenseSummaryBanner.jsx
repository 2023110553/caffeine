import styled from "styled-components";
import expenseIcon from "../../../assets/coffee.png";
import Button from "../../../components/Button";

function ExpenseSummaryBanner({
  unclassifiedCount,
  estimatedDeduction,
  summary,
  totalCount,
  itemUnclassifiedCount,
  selectedFilter,
  onFilterChange,
}) {
  return (
    <Container>
      <Wrapper>
        <Left>
          <IconCircle>
            <img src={expenseIcon} alt="지출 아이콘" />
          </IconCircle>
          <TextGroup>
            <Title>
              지출을 분류하고{" "}
              <span style={{ color: "#C9A882" }}>부가세 공제</span> 혜택을
              받으세요
            </Title>
            <Subtitle>
              품목과 지출 구분을 완료하면 공제액이 최대로 반영됩니다
            </Subtitle>
          </TextGroup>
        </Left>
        <Right>
          <Stat>
            <StatLabel>남은 미분류</StatLabel>
            <StatValue>{unclassifiedCount}건</StatValue>
          </Stat>
          <Divider />
          <Stat>
            <StatLabel>예상 공제 가능액</StatLabel>
            <StatValue>{estimatedDeduction.toLocaleString()}원</StatValue>
          </Stat>
        </Right>
      </Wrapper>

      <FilterRow>
        <FilterButton onClick={() => onFilterChange("all")}>
          <Button
            variant={
              selectedFilter === "all"
                ? "filter_checked"
                : "filter_unchecked"
            }
            size="filter"
          >
            전체
            <Count $active={selectedFilter === "all"}>{totalCount}</Count>
          </Button>
        </FilterButton>

        <FilterButton onClick={() => onFilterChange("business")}>
          <Button
            variant={
              selectedFilter === "business"
                ? "filter_checked"
                : "filter_unchecked"
            }
            size="filter"
          >
            사업 지출
            <Count $active={selectedFilter === "business"}>
              {summary.business.count}
            </Count>
          </Button>
        </FilterButton>

        <FilterButton onClick={() => onFilterChange("personal")}>
          <Button
            variant={
              selectedFilter === "personal"
                ? "filter_checked"
                : "filter_unchecked"
            }
            size="filter"
          >
            개인 지출{" "}
            <Count $active={selectedFilter === "personal"}>
              {summary.personal.count}
            </Count>
          </Button>
        </FilterButton>

        <FilterButton onClick={() => onFilterChange("unclassified")}>
          <Button
            variant={
              itemUnclassifiedCount > 0
                ? "item_unclassified"
                : "item_classified"
            }
            size="filter"
          >
            품목 미분류{" "}
            <Count
              $type={itemUnclassifiedCount > 0 ? "unclassified" : "classified"}
            >
              {itemUnclassifiedCount}
            </Count>
          </Button>
        </FilterButton>
      </FilterRow>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #3d251e 0%, #5c3327 60%, #7a4535 100%);
  border-radius: ${({ theme }) => theme.radius.large};
  padding: 16px 24px; /* TODO: design token화 */
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconCircle = styled.div`
  width: 40px; /* TODO: design token화 */
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.medium};
`;

const TextGroup = styled.div`
  display: flex;
  width: 273px;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.p`
  color: #fdf9f3;
  font-family: Outfit, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
`;

const Subtitle = styled.p`
  color: rgba(201, 168, 130, 0.8);
  font-family: Outfit, sans-serif;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const StatLabel = styled.p`
  color: #c9a882;
  text-align: center;
  font-family: Outfit, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
`;

const StatValue = styled.p`
  color: #fdf9f3;
  text-align: center;
  font-family: Outfit, sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
`;

const Divider = styled.div`
  width: 1px;
  height: 40px;
  background: rgba(201, 168, 130, 0.3);
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-top: 16px;
`;

const FilterButton = styled.div`
  flex-shrink: 0;

  button {
    width: auto;
    height: 36px;
    display: flex;
    flex-direction: row;
    display: flex;
    align-items: center;
    gap: 8px;

    padding: 8px 16px;

    border: none;
    border-radius: 12px;

    font-family: Outfit, sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
  }
`;

const Count = styled.span`
  padding: 2px 6px;
  border-radius: 6px;

  font-family: Outfit, sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 12px;

  background-color: ${({ $active, $type }) => {
    if ($type === "unclassified") return "#E07B54";
    if ($type === "classified") return "rgba(255, 255, 255, 0.15)";

    return $active ? "rgba(255, 255, 255, 0.15)" : "rgba(61, 37, 30, 0.09)";
  }};

  color: ${({ $active, $type }) => {
    if ($type === "unclassified") return "#FFFFFF";
    if ($type === "classified") return "#FFFFFF";

    return $active ? "#FDF9F3" : "#9B6E62";
  }};
`;

export default ExpenseSummaryBanner;
