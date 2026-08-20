import Button from "../../../components/Button";
import CheckIcon from "../../../assets/checkIcon.png";
import { useState, useEffect } from "react";
import { useToast } from "../../../contexts/ToastContext";
import {
  Wrapper,
  PanelTitle,
  VatBox,
  Label,
  VatAmount,
  SubLabel,
  StatGrid,
  StatLabel,
  StatValue,
  BreakdownTitle,
  BreakdownList,
  BreakdownRow,
  RowLabel,
  RowValue,
  Count,
  Amount,
  Dot,
  SegmentBar,
  Segment,
  Notice,
  Icon,
  SavingText,
  UnselectedBox,
  UnselectedTop,
  UnselectedDot,
  UnselectedTitle,
  UnselectedCount,
  UnselectedAmount,
  UnselectedDescription,
  ProgressInfo,
} from "./TaxImpactPanel.styles";

const BAR_COLOR = {
  business: "bg_brown",
  personal: "bg_beige",
  unclassified: "bg_gray",
};

function TaxImpactPanel({ summary, estimatedVat, normalInputTax, deemedInputTax, transactions }) {
  // 중복 계산 줄이기
  const isCompleted = summary.unclassified.count === 0;

  const showToast = useToast();
  const [isSaved, setIsSaved] = useState(false);

  const totalAmount = summary.business.total + summary.personal.total + summary.unclassified.total;

  const handleButtonClick = () => {
    if (isCompleted) {
      setIsSaved(true);
    } else {
      showToast("아직 미분류된 지출이 있습니다.");
    }
  };

  useEffect(() => {
    setIsSaved(false);
  }, [transactions]);

  return (
    <Wrapper>
      <PanelTitle>실시간 세금 영향</PanelTitle>

      <VatBox $completed={isCompleted}>
        <Label>예상 부가세 공제 가능액</Label>
        <VatAmount>{estimatedVat.toLocaleString()}원</VatAmount>
        <SubLabel>일반 매입세액 공제액 + 의제매입세액 공제액</SubLabel>
        {/*로직 추가 미분류에따른*/}
        {isCompleted && (
          <StatGrid>
            <div>
              <StatLabel>일반 매입세액 (10%)</StatLabel>
              <StatValue>{normalInputTax.toLocaleString()}원</StatValue>
            </div>

            <div>
              <StatLabel>의제매입세액 (9/109)</StatLabel>
              <StatValue>{deemedInputTax.toLocaleString()}원</StatValue>
            </div>
          </StatGrid>
        )}
      </VatBox>

      <BreakdownTitle>분류 현황</BreakdownTitle>

      <BreakdownList>
        <BreakdownRow>
          <RowLabel>
            <Dot $color="bg_brown" />
            사업 지출
          </RowLabel>

          <RowValue>
            <Count>{summary.business.count}건</Count>
            <Amount>{summary.business.total.toLocaleString()}원</Amount>
          </RowValue>
        </BreakdownRow>

        <BreakdownRow>
          <RowLabel>
            <Dot $color="bg_beige" />
            개인 지출
          </RowLabel>

          <RowValue>
            <Count>{summary.personal.count}건</Count>
            <Amount>{summary.personal.total.toLocaleString()}원</Amount>
          </RowValue>
        </BreakdownRow>

        <UnselectedBox $completed={isCompleted}>
          <UnselectedTop>
            <RowLabel>
              <UnselectedDot $completed={isCompleted} />
              <UnselectedTitle $completed={isCompleted}>지출 미선택</UnselectedTitle>
            </RowLabel>

            <RowValue>
              <UnselectedCount $completed={isCompleted}>
                {summary.unclassified.count}건
              </UnselectedCount>

              {!isCompleted && (
                <UnselectedAmount>{summary.unclassified.total.toLocaleString()}원</UnselectedAmount>
              )}
            </RowValue>
          </UnselectedTop>

          <UnselectedDescription $completed={isCompleted}>
            {isCompleted ? "모든 지출 구분 완료" : "사업/개인 여부 미선택"}
          </UnselectedDescription>
        </UnselectedBox>
      </BreakdownList>
      <ProgressInfo>
        <span>
          {summary.business.count + summary.personal.count}/
          {summary.business.count + summary.personal.count + summary.unclassified.count}건 완료
        </span>

        <span>
          {Math.round(
            ((summary.business.count + summary.personal.count) /
              (summary.business.count + summary.personal.count + summary.unclassified.count)) *
              100,
          ) || 0}
          %
        </span>
      </ProgressInfo>

      <SegmentBar>
        {["business", "personal", "unclassified"].map((key) => {
          const ratio = totalAmount === 0 ? 0 : (summary[key].total / totalAmount) * 100;

          if (ratio === 0) return null;

          return <Segment key={key} $color={BAR_COLOR[key]} style={{ width: `${ratio}%` }} />;
        })}
      </SegmentBar>

      {/*로직 수정*/}
      <Notice $completed={isCompleted}>
        <Icon>{isCompleted ? <img src={CheckIcon} alt="" /> : "💡"}</Icon>

        <span>
          {isCompleted ? (
            <>모든 지출이 분류되었습니다! 부가세 공제를 최대로 받을 수 있어요.</>
          ) : (
            <>
              아직 <strong>{summary.unclassified.count}건</strong>이 미분류입니다.
              <br />
              모두 분류하면 공제 혜택을 최대로
              <br /> 받을 수 있어요.
            </>
          )}
        </span>
      </Notice>

      <Button
        variant={
          isSaved ? "button_large_green" : isCompleted ? "button_large_brown" : "button_large_gray"
        }
        size="large"
        onClick={handleButtonClick}
      >
        {isSaved ? (
          "✓ 저장 완료!"
        ) : isCompleted ? (
          "분류 완료 및 부가세 공제 가능액 예측하기"
        ) : (
          <>
            품목 분류와 지출 선택 마치고
            <br />
            부가세 공제 가능액 예측하기
          </>
        )}
      </Button>
      {/*절감예상 표시유무 */}
      {isCompleted && (
        <SavingText>
          절감 예상: <strong>{estimatedVat.toLocaleString()}원</strong>
        </SavingText>
      )}
    </Wrapper>
  );
}

export default TaxImpactPanel;
