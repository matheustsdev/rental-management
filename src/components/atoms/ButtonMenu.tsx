import { Box, ButtonProps, Menu, Portal } from "@chakra-ui/react";
import SecondaryButton from "./SecondaryButton";

export type ButtonMenuItemsType<T> = {
  label: string;
  action: (data: T) => void;
  icon?: React.ReactNode;
  getDisabled?: (data: T) => boolean;
};

type IButtonMenuProps<T> = Omit<ButtonProps, "bg" | "px"> & {
  items: ButtonMenuItemsType<T>[];
  actionData: T;
};

const ButtonMenu = <T extends object>({ actionData, items, ...rest }: IButtonMenuProps<T>) => {
  return (
    <>
      <Menu.Root>
        <Menu.Trigger asChild>
          <SecondaryButton {...rest} />
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              {items.map((menuItem) => (
                <Menu.Item
                  value={menuItem.label}
                  onClick={() => menuItem.action(actionData)}
                  key={menuItem.label}
                  disabled={menuItem.getDisabled?.(actionData) ?? false}
                  cursor={(menuItem.getDisabled?.(actionData) ?? false) ? "not-allowed" : "pointer"}
                  p="2"
                >
                  {menuItem.icon && menuItem.icon}
                  <Box flex="1">{menuItem.label}</Box>
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </>
  );
};

export default ButtonMenu;
