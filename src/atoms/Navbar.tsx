"use client";

import { Flex } from "@chakra-ui/react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <Flex bg="secondary.500" px="8" py="4" minW="100vw" color="black" gap="8">
      <Link href="rent">Alugueis</Link>
      <Link href="/">Produtos</Link>
    </Flex>
  );
};

export default Navbar;
