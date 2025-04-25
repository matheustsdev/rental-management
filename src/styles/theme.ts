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
        beige: {
          50: { value: "#F5F3F1" },
          100: { value: "#E8E4DF" },
          200: { value: "#DCD6D0" },
          300: { value: "#D0C8C1" },
          400: { value: "#C8C2B9" },
          500: { value: "#C8C2B9" },
          600: { value: "#B1ABA3" },
          700: { value: "#9B948C" },
          800: { value: "#847D75" },
          900: { value: "#6D6661" },
        },
        taupe: {
          50: { value: "#F2EAE5" },
          100: { value: "#E5D6CC" },
          200: { value: "#D8C2B2" },
          300: { value: "#CCAE99" },
          400: { value: "#BF9A7F" },
          500: { value: "#AB9685" },
          600: { value: "#9B8676" },
          700: { value: "#8B7666" },
          800: { value: "#7B6657" },
          900: { value: "#6B5647" },
        },
        terracotta: {
          50: { value: "#F5E6DE" },
          100: { value: "#EBCDBC" },
          200: { value: "#E1B39B" },
          300: { value: "#D79979" },
          400: { value: "#CD7F58" },
          500: { value: "#B18E72" },
          600: { value: "#A07F66" },
          700: { value: "#8F705A" },
          800: { value: "#7E614E" },
          900: { value: "#6D5242" },
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
