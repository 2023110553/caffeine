import { useState, useMemo } from "react";
import styled from "styled-components";
import ExpenseHeader from "./components/ExpenseHeader";
import ExpenseSummaryBanner from "./components/ExpenseSummaryBanner";
import ExpenseList from "./components/ExpenseList";
import TaxImpactPanel from "./components/TaxImpactPanel";

const MOCK_TRANSACTIONS = [
  {
    id: 1,
    icon: "🥛",
    merchant: "서울우유 대리점",
    memo: "식자재",
    date: "8월 8일",
    amount: 850000,
    category: null,
    isDeemed: true,
  },
  {
    id: 2,
    icon: "🛒",
    merchant: "신세계 마트",
    memo: "식자재·소모품",
    date: "8월 7일",
    amount: 320000,
    category: null,
    isDeemed: false,
  },
  {
    id: 3,
    icon: "🏪",
    merchant: "GS25 편의점",
    memo: "개인구매",
    date: "8월 6일",
    amount: 12500,
    category: null,
    isDeemed: false,
  },
  {
    id: 4,
    icon: "⚡",
    merchant: "한국전력공사",
    memo: "전기요금",
    date: "8월 5일",
    amount: 278000,
    category: null,
    isDeemed: false,
  },
  {
    id: 5,
    icon: "📦",
    merchant: "쿠팡 비즈니스",
    memo: "사무용품",
    date: "8월 4일",
    amount: 95400,
    category: null,
    isDeemed: false,
  },
  {
    id: 6,
    icon: "🎬",
    merchant: "넷플릭스 코리아",
    memo: "구독",
    date: "8월 3일",
    amount: 17000,
    category: null,
    isDeemed: false,
  },
  {
    id: 7,
    icon: "☕",
    merchant: "더치트커피 원두",
    memo: "원두·재료",
    date: "8월 2일",
    amount: 430000,
    category: null,
    isDeemed: true,
  },
  {
    id: 8,
    icon: "💳",
    merchant: "카카오페이 수수료",
    memo: "결제수수료",
    date: "8월 1일",
    amount: 22300,
    category: null,
    isDeemed: false,
  },
  {
    id: 9,
    icon: "🧴",
    merchant: "올리브영",
    memo: "개인용품",
    date: "7월 31일",
    amount: 38000,
    category: null,
    isDeemed: false,
  },
  {
    id: 10,
    icon: "📡",
    merchant: "KT 인터넷",
    memo: "통신비",
    date: "7월 30일",
    amount: 55000,
    category: null,
    isDeemed: false,
  },
  {
    id: 11,
    icon: "🏬",
    merchant: "이마트 트레이더스",
    memo: "식자재",
    date: "7월 29일",
    amount: 512000,
    category: null,
    isDeemed: false,
  },
  {
    id: 12,
    icon: "📣",
    merchant: "배달의민족 광고",
    memo: "마케팅",
    date: "7월 28일",
    amount: 180000,
    category: null,
    isDeemed: false,
  },
];

function TransactionReviewPage() {
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);

  const handleCategoryChange = (id, category) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id
          ? {
              ...tx,
              category: tx.category === category ? null : category,
            }
          : tx,
      ),
    );
  };

  const summary = useMemo(() => {
    const result = {
      business: { count: 0, total: 0 },
      personal: { count: 0, total: 0 },
      unclassified: { count: 0, total: 0 },
    };

    transactions.forEach((tx) => {
      const key = tx.category ?? "unclassified";
      if (!result[key]) return;

      result[key].count += 1;
      result[key].total += tx.amount;
    });

    return result;
  }, [transactions]);

  // 배너 + 우측 패널 양쪽에서 쓰는 값이라 페이지 레벨에서 한 번만 계산
  const taxSummary = useMemo(() => {
    let normalInputTax = 0;
    let deemedInputTax = 0;

    transactions.forEach((tx) => {
      if (tx.category !== "business") return;

      if (tx.isDeemed) {
        deemedInputTax += Math.round(tx.amount * (9 / 109));
      } else {
        normalInputTax += Math.round(tx.amount * 0.1);
      }
    });

    return {
      normalInputTax,
      deemedInputTax,
      estimatedVat: normalInputTax + deemedInputTax,
    };
  }, [transactions]);

  return (
    <Wrapper>
      <ExpenseHeader />

      <ContentGrid>
        <LeftColumn>
          <ExpenseSummaryBanner
            unclassifiedCount={summary.unclassified.count}
            estimatedDeduction={taxSummary.estimatedVat}
          />

          <ExpenseList
            transactions={transactions}
            summary={summary}
            onCategoryChange={handleCategoryChange}
          />
        </LeftColumn>

        <TaxImpactPanel
          summary={summary}
          estimatedVat={taxSummary.estimatedVat}
          normalInputTax={taxSummary.normalInputTax}
          deemedInputTax={taxSummary.deemedInputTax}
        />
      </ContentGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  min-height: 0; /* 스크롤 체인 2단계 */
  display: flex;
  flex-direction: column;
`;

const ContentGrid = styled.div`
  flex: 1;
  min-height: 0;

  display: flex;
  align-items: stretch;
`;

const LeftColumn = styled.div`
  flex: 1;
  min-width: 70px;
  min-height: 0;

  display: flex;
  flex-direction: column;

  padding: 24px 32px;
`;

export default TransactionReviewPage;
