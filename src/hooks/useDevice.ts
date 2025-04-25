import { useBreakpointValue } from "@chakra-ui/react";

export const useDevice = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return {
    isMobile,
  };
};
