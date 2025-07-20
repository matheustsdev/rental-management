"use client";

import Navbar from "@/atoms/Navbar";
import { Flex, FlexProps, Heading } from "@chakra-ui/react";

interface IPageContainerProps extends Omit<FlexProps, "minW" | "color" | "bg"> {
  title: string;
}

const PageContainer: React.FC<IPageContainerProps> = ({ title, ...rest }) => {
  return (
    <Flex bg="beige.500" minW="100vw" minH="100vh" color="black" flexDir="column" gap="8" overflowY="hidden">
      <Flex>
        <Navbar />
      </Flex>
      <Heading fontSize="3xl" px="8">
        {title}
      </Heading>
      <Flex px="8" minW="full" {...rest} />
    </Flex>
  );
};

export default PageContainer;
