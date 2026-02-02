"use client";

import { Flex, Text } from "@chakra-ui/react";

interface ITextRow {
  label?: string;
  value?: string;
}

const TextRow: React.FC<ITextRow> = ({ label, value }) => {
  return (
    <Flex gap="1">
      {label && <Text fontWeight="bold">{label}: </Text>}
      <Text>{value ?? ""}</Text>
    </Flex>
  );
};

export default TextRow;
