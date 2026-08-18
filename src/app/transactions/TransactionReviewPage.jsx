import { useState, useMemo } from "react";
import styled from "styled-components";
import ExpenseHeader from "./components/ExpenseHeader";
import ExpenseSummaryBanner from "./components/ExpenseSummaryBanner";
import ExpenseList from "./components/ExpenseList";
import TaxImpactPanel from "./components/TaxImpactPanel";

const MOCK_TRANSACTIONS = [
  {
    transaction_id: 1,
    icon: "🥛",
    merchant_name: "서울우유 대리점",
    memo: "식자재",
    date: "8월 8일",
    total_amount: 850000,
    category: null,
    is_deemed: true, // TODO: 실제 API 필드명 백엔드 확인 필요 - 명세서에서 근거 못 찾음
  },
  {
    transaction_id: 2,
    icon: "🛒",
    merchant_name: "신세계 마트",
    memo: "식자재·소모품",
    date: "8월 7일",
    total_amount: 320000,
    category: null,
    is_deemed: false,
  },
  {
    transaction_id: 3,
    icon: "🏪",
    merchant_name: "GS25 편의점",
    memo: "개인구매",
    date: "8월 6일",
    total_amount: 12500,
    category: null,
    is_deemed: false,
  },
  {
    transaction_id: 4,
    icon: "⚡",
    merchant_name: "한국전력공사",
    memo: "전기요금",
    date: "8월 5일",
    total_amount: 278000,
    category: null,
    is_deemed: false,
  },
  {
    transaction_id: 5,
    icon: "📦",
    merchant_name: "쿠팡 비즈니스",
    memo: "사무용품",
    date: "8월 4일",
    total_amount: 95400,
    category: null,
    is_deemed: false,
  },
  {
    transaction_id: 6,
    icon: "🎬",
    merchant_name: "넷플릭스 코리아",
    memo: "구독",
    date: "8월 3일",
    total_amount: 17000,
    category: null,
    is_deemed: false,
  },
  {
    transaction_id: 7,
    icon: "☕",
    merchant_name: "더치트커피 원두",
    memo: "원두·재료",
    date: "8월 2일",
    total_amount: 430000,
    category: null,
    is_deemed: true,
  },
  {
    transaction_id: 8,
    icon: "💳",
    merchant_name: "카카오페이 수수료",
    memo: "결제수수료",
    date: "8월 1일",
    total_amount: 22300,
    category: null,
    is_deemed: false,
  },
  {
    transaction_id: 9,
    icon: "🧴",
    merchant_name: "올리브영",
    memo: "개인용품",
    date: "7월 31일",
    total_amount: 38000,
    category: null,
    is_deemed: false,
  },
  {
    transaction_id: 10,
    icon: "📡",
    merchant_name: "KT 인터넷",
    memo: "통신비",
    date: "7월 30일",
    total_amount: 55000,
    category: null,
    is_deemed: false,
  },
  {
    transaction_id: 11,
    icon: "🏬",
    merchant_name: "이마트 트레이더스",
    memo: "식자재",
    date: "7월 29일",
    total_amount: 512000,
    category: null,
    is_deemed: false,
  },
  {
    transaction_id: 12,
    icon: "📣",
    merchant_name: "배달의민족 광고",
    memo: "마케팅",
    date: "7월 28일",
    total_amount: 180000,
    category: null,
    is_deemed: false,
  },
];

function TransactionReviewPage() {
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);

  const handleCategoryChange = (id, category) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.transaction_id === id
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
      result[key].total += tx.total_amount;
    });

    return result;
  }, [transactions]);

  // 배너 + 우측 패널 양쪽에서 쓰는 값이라 페이지 레벨에서 한 번만 계산
  const taxSummary = useMemo(() => {
    let normalInputTax = 0;
    let deemedInputTax = 0;

    transactions.forEach((tx) => {
      if (tx.category !== "business") return;

      if (tx.is_deemed) {
        deemedInputTax += Math.round(tx.total_amount * (9 / 109));
      } else {
        normalInputTax += Math.round(tx.total_amount * 0.1);
      }
    });

    return {
      normalInputTax,
      deemedInputTax,
      estimatedVat: normalInputTax + deemedInputTax,
    };
  }, [transactions]);

  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <Wrapper>
      <ExpenseHeader />

      <ContentGrid>
        <LeftColumn>
          <ExpenseSummaryBanner
            unclassifiedCount={summary.unclassified.count}
            estimatedDeduction={taxSummary.estimatedVat}
            summary={summary}
            totalCount={transactions.length}
            itemUnclassifiedCount={summary.unclassified.count}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />

          <ExpenseList
            transactions={transactions}
            summary={summary}
            selectedFilter={selectedFilter}
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
