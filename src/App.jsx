import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { BusinessProvider } from "./contexts/BusinessContext";
import { ToastProvider } from "./contexts/ToastContext";
import Router from "./router/Router";
import GlobalStyle from "./styles/GlobalStyle";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <BusinessProvider>
          <ToastProvider>
            <GlobalStyle />
            <Router />
          </ToastProvider>
        </BusinessProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
