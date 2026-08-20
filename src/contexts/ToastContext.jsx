import { createContext, useCallback, useContext, useRef, useState } from "react";
import styled from "styled-components";

const ToastContext = createContext(null);

let nextId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timeoutsRef = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    const timeoutId = timeoutsRef.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutsRef.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    (message, { duration = 3200 } = {}) => {
      const id = nextId++;
      setToasts((prev) => [...prev, { id, message }]);
      const timeoutId = setTimeout(() => dismiss(id), duration);
      timeoutsRef.current.set(id, timeoutId);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Viewport role="status" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} onClick={() => dismiss(toast.id)}>
            {toast.message}
          </ToastItem>
        ))}
      </Viewport>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast는 ToastProvider 안에서만 사용할 수 있어요");
  }
  return context.showToast;
}

const Viewport = styled.div`
  position: fixed;
  left: 50%;
  bottom: 32px;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;

  z-index: 2000;
  pointer-events: none;
`;

const ToastItem = styled.div`
  padding: 12px 20px;

  background-color: ${({ theme }) => theme.colors.bg_brown};
  color: ${({ theme }) => theme.colors.txt_white};

  border-radius: ${({ theme }) => theme.radius.medium};

  font-size: 14px;
  font-weight: 600;

  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

  cursor: pointer;
  pointer-events: auto;
`;
