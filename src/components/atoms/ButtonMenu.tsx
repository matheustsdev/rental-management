import { Box, ButtonProps, Menu, Portal, Spinner } from "@chakra-ui/react";
import SecondaryButton from "./SecondaryButton";

export type ButtonMenuItemsType<T> = {
  label: string;
  action: (data: T) => void;
  icon?: React.ReactNode;
  getDisabled?: (data: T) => boolean;
  getIsLoading?: (data: T) => boolean;
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
              {items.map((menuItem) => {
                const isDisabled = menuItem.getDisabled?.(actionData) ?? false;
                const isLoading = menuItem.getIsLoading?.(actionData) ?? false;

                return (
                  <Menu.Item
                    value={menuItem.label}
                    onClick={() => !isLoading && !isDisabled && menuItem.action(actionData)}
                    key={menuItem.label}
                    disabled={isDisabled || isLoading}
                    cursor={isDisabled || isLoading ? "not-allowed" : "pointer"}
                    p="2"
                    closeOnSelect={!isLoading}
                  >
                    {isLoading ? <Spinner size="xs" color="primary.300" /> : menuItem.icon && menuItem.icon}
                    <Box flex="1" ml={isLoading || menuItem.icon ? "2" : "0"}>
                      {menuItem.label}
                    </Box>
                  </Menu.Item>
                );
              })}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </>
  );
};

export default ButtonMenu;
