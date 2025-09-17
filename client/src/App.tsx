import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { Router } from "./Router";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#C98C6F",
    },
  },
});

export const App = () => (
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
