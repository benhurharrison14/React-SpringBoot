import { ThemeProvider } from "@mui/material";
import theme from "../src/utils/themes/index";
import "../src/index.css";
import { BrowserRouter } from "react-router-dom";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <BrowserRouter>{Story()}</BrowserRouter>
    </ThemeProvider>
  ),
];
