"use client";

import { CloseButton, Drawer, Flex, Heading, Icon, Portal, Separator } from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { usePathname } from "next/navigation";
import NavLink from "../atoms/NavLink";
import { useState } from "react";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  return (
    <Drawer.Root placement="start" open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <Drawer.Trigger cursor="pointer">
        <Icon size="lg" color="white">
          <RxHamburgerMenu />
        </Icon>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header py="6" pl="4">
              <Drawer.Title color="black">
                <Heading as="h2" fontSize="2rem">
                  Menu
                </Heading>
              </Drawer.Title>
            </Drawer.Header>
            <Separator />
            <Drawer.Body>
              <Flex px="8" py="4" color="black" gap="4" flexDir="column" fontSize="lg">
                <NavLink href="/" title="Início" isActive={pathname === "/"} onClick={onClose} />
                <NavLink href="/rents" title="Alugueis" isActive={pathname.includes("/rents")} onClick={onClose} />
                <NavLink
                  href="/products"
                  title="Produtos"
                  isActive={pathname.includes("/products")}
                  onClick={onClose}
                />
              </Flex>
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="2xl" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default Navbar;
