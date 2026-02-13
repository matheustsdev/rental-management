"use client";

import { Flex, Text, Icon, FlexProps, IconProps } from "@chakra-ui/react";

interface ITextRow extends Omit<FlexProps, "gap"> {
  icon?: React.ReactNode;
  label?: string;
  value?: string;
  iconSize?: IconProps["size"];
}

const TextRow: React.FC<ITextRow> = ({ icon, label, value, iconSize, ...rest }) => {
  return (
    <Flex gap="1" align="flex-end" {...rest}>
      {icon && <Icon size={iconSize ?? "lg"}>{icon}</Icon>}
      {label && <Text fontWeight="bold">{label}: </Text>}
      <Text>{value ?? ""}</Text>
    </Flex>
  );
};

export default TextRow;
