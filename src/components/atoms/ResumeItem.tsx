"use client";

import { Flex, Text } from "@chakra-ui/react";

interface IResumeItemProps {
  prop: string;
  value: string;
}

const ResumeItem: React.FC<IResumeItemProps> = ({ prop, value }) => {
  return (
    <Flex gap="1">
      <Text fontWeight="bold">{prop}: </Text>
      <Text>{value}</Text>
    </Flex>
  );
};

export default ResumeItem;
