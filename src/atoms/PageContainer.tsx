"use client";

import { Flex, FlexProps } from "@chakra-ui/react";

const PageContainer: React.FC<Omit<FlexProps, "minW" | "color" | "bg">> = ({ ...rest }) => {
  return <Flex bg="beige.500" minW="100vw" color="black" {...rest} />;
};

export default PageContainer;
