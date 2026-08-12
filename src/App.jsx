import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { BusinessProvider } from "./contexts/BusinessContext";
import Router from "./router/Router";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BusinessProvider>
        <GlobalStyle />
        <Router />
      </BusinessProvider>
    </ThemeProvider>
  );
}

export default App;