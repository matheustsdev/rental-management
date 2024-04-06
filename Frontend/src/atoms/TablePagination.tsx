import {
    ChevronsLeft,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
  } from "lucide-react";

import { Tfoot, Tr, Td, Button, Flex, Text } from "@chakra-ui/react";

interface ITablePaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    columnsAmount: number;
    goToFirstPage: () => void;
    goToPreviousPage: () => void;
    goToNextPage: () => void;
    goToLastPage: () => void;
}

export function TablePagination({ currentPage, totalPages, totalItems, itemsPerPage, columnsAmount, goToFirstPage, goToPreviousPage, goToNextPage, goToLastPage }: ITablePaginationProps) {
    return (
        <Tfoot>
            <Tr>
                <Td colSpan={Math.floor(columnsAmount / 2)} py="1rem">
                    Mostrando {(totalItems - (currentPage - 1) * itemsPerPage) >= itemsPerPage ? itemsPerPage : totalItems - (currentPage - 1) * itemsPerPage} de {totalItems} itens
                </Td>
                <Td colSpan={columnsAmount - Math.floor(columnsAmount / 2)} textAlign="right" py="1rem">
                    <Flex direction="column" justify="center" align="flex-end" w="100%">
                        <Text textAlign="center">
                            Página {currentPage} de {totalPages}
                        </Text>
                        <Flex align="center" justify="flex-end" gap="0.5rem">
                            <Button p="0" onClick={goToFirstPage} isDisabled={currentPage === 1}>
                                <ChevronsLeft />
                            </Button>
                            <Button p="0" onClick={goToPreviousPage} isDisabled={currentPage === 1}>
                                <ChevronLeft />
                            </Button>
                            <Button p="0" onClick={goToNextPage} isDisabled={currentPage === totalPages}>
                                <ChevronRight />
                            </Button>
                            <Button p="0" onClick={goToLastPage} isDisabled={currentPage === totalPages}>
                                <ChevronsRight />
                            </Button>
                        </Flex>
                    </Flex>
                </Td>
            </Tr>
        </Tfoot>
    )
}