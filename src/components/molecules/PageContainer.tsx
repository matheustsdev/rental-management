"use client";

import { ButtonProps, Flex, FlexProps, Heading } from "@chakra-ui/react";
import { Toaster } from "../atoms/Toaster";
import SearchBar, { ISearchBarProps } from "../atoms/SearchBar";
import PrimaryButton from "../atoms/PrimaryButton";
import { MdAdd } from "react-icons/md";
import { useDevice } from "@/hooks/useDevice";
import Navbar from "./Navbar";

interface IPageContainerProps extends Omit<FlexProps, "minW" | "color" | "bg"> {
  title: string;
  searchBarProps?: ISearchBarProps;
  buttonProps?: ButtonProps;
}

const PageContainer: React.FC<IPageContainerProps> = ({ title, searchBarProps, buttonProps, ...rest }) => {
  const { isMobile } = useDevice();

  return (
    <Flex bg="body.400" minW="100vw" minH="100vh" color="black" flexDir="column" gap="8" overflowY="hidden">
      <Toaster />
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        w="full"
        align="center"
        bg="secondary.500"
        justify="space-between"
        px={{ base: "4", lg: "10" }}
        py="6"
        gap="6"
        h="fit-content"
      >
        <Flex align="center" justify="space-between" w="full" gap={{ base: "unset", lg: "8" }}>
          <Navbar />
          <Heading
            alignSelf={{ base: "center", lg: "flex-start" }}
            w="full"
            color="white"
            fontSize="3xl"
            textAlign={{ base: "center", lg: "start" }}
          >
            {title}
          </Heading>
        </Flex>
        <Flex align="center" justify={{ base: "space-between", lg: "flex-end" }} gap="8" w="full">
          {searchBarProps && <SearchBar {...searchBarProps} />}
          {buttonProps && (
            <PrimaryButton borderRadius={{ base: "50%", lg: "md" }} {...buttonProps}>
              <MdAdd /> {!isMobile && "Adicionar novo"}
            </PrimaryButton>
          )}
        </Flex>
      </Flex>
      <Flex px="8" minW="full" minH="full" {...rest} />
    </Flex>
  );
};

export default PageContainer;
