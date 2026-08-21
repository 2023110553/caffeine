import { useCallback, useState } from "react";

/**
 * 여러 페이지(DashboardPage, PayrollPage, SettingsPage, TransactionReviewPage)에서
 * 반복되던 isLoading/error/try-catch-finally 보일러플레이트를 추출한 훅.
 * - 실행 시점(useEffect의 deps)은 호출부가 그대로 관리
 * - 이 훅은 run()으로 감싼 비동기 호출의 isLoading/error 상태만 책임짐
 *
 * @param {{ errorMessage?: string }} [options]
 * @returns {{ isLoading: boolean, error: string|null, run: (asyncFn: () => Promise<void>) => Promise<void> }}
 */
export function useAsync({ errorMessage = "데이터를 불러오지 못했어요." } = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const run = useCallback(
    (asyncFn) => {
      setIsLoading(true);
      setError(null);
      return asyncFn()
        .catch((err) => {
          console.error(errorMessage, err);
          setError(errorMessage);
        })
        .finally(() => setIsLoading(false));
    },
    [errorMessage],
  );

  return { isLoading, error, run };
}
