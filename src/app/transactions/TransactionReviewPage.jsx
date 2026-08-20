import { useState, useEffect, useMemo, useCallback } from "react";
import styled from "styled-components";
import ExpenseHeader from "./components/ExpenseHeader";
import ExpenseSummaryBanner from "./components/ExpenseSummaryBanner";
import ExpenseList from "./components/ExpenseList";
import TaxImpactPanel from "./components/TaxImpactPanel";
import Loading from "../../components/Loading";
import ErrorState from "../../components/ErrorState";
import { useBusiness } from "../../contexts/BusinessContext";
import { useAsync } from "../../hooks/useAsync";
import {
  getTransactions,
  updateTransactionPurpose,
  updateTransactionCategory,
} from "../../api/transactions";
import { ITEM_CATEGORY_LABEL } from "./constants";
import { formatDate } from "../../lib/format";
const now = new Date();
const YEAR = now.getFullYear();
const MONTH = now.getMonth() + 1;

// expense_purpose.code(BUSINESS/PERSONAL/UNCLASSIFIED)를 mock 시절 category 값(business/personal/null)으로,
// 나머지 필드(total_amount 문자열→숫자, date 포맷, icon/memo 등 API에 없는 표시용 값)를 컴포넌트가 기대하는 형태로 변환
const PURPOSE_TO_CATEGORY = {
  BUSINESS: "business",
  PERSONAL: "personal",
  UNCLASSIFIED: null,
};

function normalizeTransaction(raw) {
  return {
    transaction_id: raw.transaction_id,
    merchant_name: raw.merchant_name || "상호명 미확인",
    memo: raw.category?.label ?? "미분류",
    date: formatDate(raw.date),
    total_amount: Number(raw.total_amount),
    category: PURPOSE_TO_CATEGORY[raw.expense_purpose?.code] ?? null,
    itemCategoryCode: raw.category?.code ?? "UNCLASSIFIED",
    is_deemed: raw.is_deemed,
  };
}

function TransactionReviewPage() {
  const { business } = useBusiness();
  const [transactions, setTransactions] = useState([]);

  const { isLoading, error, run } = useAsync({
    errorMessage: "거래 내역을 불러오지 못했어요. 사업장 정보를 확인해주세요.",
  });

  const loadData = useCallback(async () => {
    const res = await getTransactions(business.businessId, {
      start_date: `${YEAR}-${String(MONTH).padStart(2, "0")}-01`,
      transaction_type: "PURCHASE",
    });
    setTransactions(res.data.items.map(normalizeTransaction));
  }, [business.businessId]);

  useEffect(() => {
    run(loadData);
  }, [run, loadData]);

  const handleCategoryChange = async (id, category) => {
    const target = transactions.find((tx) => tx.transaction_id === id);
    if (!target) return;

    const nextCategory = target.category === category ? null : category;

    const expensePurpose = nextCategory === null ? "UNCLASSIFIED" : nextCategory.toUpperCase();

    // 1) 화면 우선 반영
    setTransactions((prev) =>
      prev.map((tx) => (tx.transaction_id === id ? { ...tx, category: nextCategory } : tx)),
    );

    // 2) 서버 응답 최신 데이터(is_deemed 등)로 덮어쓰기
    try {
      const res = await updateTransactionPurpose(business.businessId, id, expensePurpose);

      if (res.data) {
        setTransactions((prev) =>
          prev.map((tx) => (tx.transaction_id === id ? normalizeTransaction(res.data) : tx)),
        );
      }
    } catch (err) {
      console.error("지출 구분 수정 실패", err);
    }
  };

  const handleItemCategoryChange = async (id, categoryCode) => {
    // 1) 화면 우선 반영
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.transaction_id === id
          ? {
              ...tx,
              itemCategoryCode: categoryCode,
              memo: ITEM_CATEGORY_LABEL[categoryCode],
            }
          : tx,
      ),
    );

    // 2) 서버 응답 최신 데이터(is_deemed 등)로 덮어쓰기
    try {
      const res = await updateTransactionCategory(business.businessId, id, categoryCode);

      if (res.data) {
        setTransactions((prev) =>
          prev.map((tx) => (tx.transaction_id === id ? normalizeTransaction(res.data) : tx)),
        );
      }
    } catch (err) {
      console.error("품목 카테고리 수정 실패", err);
    }
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

  // 사업/개인 미분류(category)와 품목 미분류(itemCategoryCode)는 서로 다른 개념이라 별도로 카운트
  const itemUnclassifiedCount = useMemo(
    () => transactions.filter((tx) => tx.itemCategoryCode === "UNCLASSIFIED").length,
    [transactions],
  );

  // 배너 + 우측 패널 양쪽에서 쓰는 값이라 페이지 레벨에서 한 번만 계산
  const taxSummary = useMemo(() => {
    let normalInputTax = 0;
    let deemedInputTax = 0;

    transactions.forEach((tx) => {
      if (tx.category !== "business") return;

      if (tx.is_deemed) {
        deemedInputTax += Math.round(tx.total_amount * (9 / 109));
      } else {
        normalInputTax += Math.round(tx.total_amount / 11);
      }
    });

    return {
      normalInputTax,
      deemedInputTax,
      estimatedVat: normalInputTax + deemedInputTax,
    };
  }, [transactions]);

  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleRetry = () => run(loadData);

  if (isLoading) return <Loading />;
  if (error) return <ErrorState message={error} onRetry={handleRetry} />;

  return (
    <Wrapper>
      <ExpenseHeader year={YEAR} month={MONTH} />

      <ContentGrid>
        <LeftColumn>
          <ExpenseSummaryBanner
            unclassifiedCount={summary.unclassified.count}
            estimatedDeduction={taxSummary.estimatedVat}
            summary={summary}
            totalCount={transactions.length}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />

          <ExpenseList
            transactions={transactions}
            summary={summary}
            selectedFilter={selectedFilter}
            onItemCategoryChange={handleItemCategoryChange}
            onCategoryChange={handleCategoryChange}
          />
        </LeftColumn>

        <TaxImpactPanel
          summary={summary}
          estimatedVat={taxSummary.estimatedVat}
          normalInputTax={taxSummary.normalInputTax}
          deemedInputTax={taxSummary.deemedInputTax}
          transactions={transactions}
        />
      </ContentGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  scrollbar-width: none;
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
