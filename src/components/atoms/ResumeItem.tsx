"use client";

import { Flex, FlexProps, Text } from "@chakra-ui/react";

interface IResumeItemProps extends FlexProps {
  prop: string;
  value: string;
}

const ResumeItem: React.FC<IResumeItemProps> = ({ prop, value, ...rest }) => {
  return (
    <Flex gap="1" {...rest}>
      <Text fontWeight="bold">{prop}: </Text>
      <Text h="fit-content">{value}</Text>
    </Flex>
  );
};

export default ResumeItem;
