import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const customTheme = {
  styles: {
    global: {
      body: {
        bg: "#151019",
      },
    },
  },
};

const theme = extendTheme({ config }, customTheme);

export default theme;
