"use client";

import { Portal, Select as ChakraSelect, createListCollection, Flex } from "@chakra-ui/react";
import { useRef } from "react";

export type ListSelectOptionsType = {
  label: string;
  value: string;
};

interface IListSelectProps {
  label: string;
  options: ListSelectOptionsType[];
  selectedValue?: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg";
  width?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  dialogContentRef?: React.RefObject<HTMLDivElement | null>;
}

const Select: React.FC<IListSelectProps> = ({
  label,
  options,
  selectedValue,
  onChange,
  onClear,
  placeholder,
  size = "md",
  width = "full",
  isRequired = false,
  isDisabled = false,
  dialogContentRef,
}) => {
  const optionsCollection = createListCollection({
    items: options,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
  });

  const defaultRef = useRef<HTMLDivElement>(null);
  const contentRef = dialogContentRef ?? defaultRef;

  return (
    <ChakraSelect.Root
      collection={optionsCollection}
      size={size}
      width={width}
      value={selectedValue ? [selectedValue] : undefined}
      onValueChange={(item) => onChange(item.value[0])}
      disabled={isDisabled}
      required={isRequired}
      positioning={{
        sameWidth: true,
        strategy: "fixed",
      }}
    >
      <ChakraSelect.HiddenSelect />

      <ChakraSelect.Label>{label}</ChakraSelect.Label>

      <ChakraSelect.Control>
        <ChakraSelect.Trigger px="2">
          <ChakraSelect.ValueText placeholder={placeholder ?? `Selecione ${label}`} />
        </ChakraSelect.Trigger>
        <ChakraSelect.IndicatorGroup pr="2">
          {selectedValue && onClear && <ChakraSelect.ClearTrigger onClick={onClear} />}
          <ChakraSelect.Indicator />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>

      <Portal container={contentRef ?? undefined}>
        <ChakraSelect.Positioner>
          <ChakraSelect.Content>
            {optionsCollection.items.map((option) => (
              <ChakraSelect.Item key={String(option.value)} item={option}>
                <Flex
                  align="center"
                  justify="space-between"
                  w="full"
                  px="4"
                  py="2"
                  borderBottom="1px solid"
                  borderColor="whiteAlpha.400"
                >
                  {option.label}
                  <ChakraSelect.ItemIndicator />
                </Flex>
              </ChakraSelect.Item>
            ))}
          </ChakraSelect.Content>
        </ChakraSelect.Positioner>
      </Portal>
    </ChakraSelect.Root>
  );
};

export default Select;
