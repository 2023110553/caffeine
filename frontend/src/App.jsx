import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import Router from "./router/Router";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;