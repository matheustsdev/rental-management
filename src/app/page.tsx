"use client";

import PageContainer from "@/components/molecules/PageContainer";
import { Box, Heading, Stack } from "@chakra-ui/react";

export default function Home() {
  return (
    <PageContainer title="Início" flexDir="column" align="center" gap="8" overflowY="auto">
      <Stack gap="8" w="full" maxW="container.md" mt={10} textAlign="center">
        <Box>
          <Heading size="3xl" color="primary.300">
            Bem-vindo à Rose Noivas
          </Heading>
        </Box>
      </Stack>
    </PageContainer>
  );
}
