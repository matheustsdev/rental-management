"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { ColorModeProvider } from "./color-mode";
import themeSystem from "@/styles/theme";

interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <ColorModeProvider>
      <ChakraProvider value={themeSystem}>{children}</ChakraProvider>
    </ColorModeProvider>
  );
}
