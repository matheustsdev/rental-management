import { useBreakpointValue } from "@chakra-ui/react";

type Device = "mobile" | "tablet" | "desktop";
type Bp = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

export const useDevice = () => {
  const bp =
    useBreakpointValue<Bp>({
      base: "base",
      sm: "sm",
      md: "md",
      lg: "lg",
      xl: "xl",
      "2xl": "2xl",
    }) ?? "base";

  const device: Device = bp === "base" || bp === "sm" ? "mobile" : bp === "md" || bp === "lg" ? "tablet" : "desktop";

  return {
    device,
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
  };
};
