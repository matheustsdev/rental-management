import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const themeConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          50: { value: "#FEEAEF" },
          100: { value: "#FED6DF" },
          200: { value: "#FA416C" },
          300: { value: "#E9063B" },
          400: { value: "#9F0428" },
          500: { value: "#560216" },
          600: { value: "#440211" },
          700: { value: "#33010D" },
          800: { value: "#220109" },
          900: { value: "#110004" },
        },
        secondary: {
          50: { value: "#FFFBEE" },
          100: { value: "#FFF5D0" },
          200: { value: "#FFEEB2" },
          300: { value: "#FFE893" },
          400: { value: "#FEE175" },
          500: { value: "#FFDA58" },
          600: { value: "#FFCC12" },
          700: { value: "#CDA100" },
          800: { value: "#896B00" },
          900: { value: "#443600" },
        },
        body: {
          400: { value: "#F4F4F4" },
        },
      },
    },
  },
});

const themeSystem = createSystem(defaultConfig, themeConfig);

export default themeSystem;
