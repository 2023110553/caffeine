import { createContext, useContext, useState } from "react";

const BusinessContext = createContext(null);

export function BusinessProvider({ children }) {
  // TODO: 실제로는 앱 진입 시 API로 조회해서 초기값 채워야 함 (지금은 뼈대만)
  const [business, setBusiness] = useState({
    businessId: null,
    isSetupComplete: true, // TODO: 온보딩 API 연동되면 실제 값으로 교체, 임시 mock
    isCodefAuthenticated: false,
  });

  const value = { business, setBusiness };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error("useBusiness는 BusinessProvider 안에서만 사용할 수 있어요");
  }
  return context;
}