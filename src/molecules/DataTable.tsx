"use client";

import React, { useState } from "react";
import { Table, Flex, Text, IconButton, Icon, Spinner } from "@chakra-ui/react";
import { IoChevronForwardOutline, IoChevronBackOutline, IoArrowUp, IoArrowDown } from "react-icons/io5";
import Select from "@/atoms/Select";

// Tipo para definição de colunas
export interface DataTableColumn<T> {
  key: keyof T;
  header: string;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  align?: "start" | "end";
}

// Propriedades do componente
interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  totalPages?: number;
  currentPage?: number;
  isLoading?: boolean;
  onPageChange?: (page: number) => Promise<void>;
  onRowsPerPageChange?: (rows: number) => void;
  onSort?: (column: keyof T, direction: "asc" | "desc") => void;
  actions?: (row: T) => React.ReactNode;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  totalPages = 1,
  currentPage = 1,
  isLoading = false,
  onPageChange,
  onRowsPerPageChange,
  onSort,
  actions,
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      // Toggle direction if same column
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }

    onSort?.(column, sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <Flex flexDir="column" w="full" align="flex-end" justify="center" h="full">
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row bg="terracotta.500" py="4" color="white">
            {columns.map((column) => (
              <Table.ColumnHeader
                key={String(column.key)}
                textAlign={column.align || "start"}
                onClick={() => column.sortable && handleSort(column.key)}
                cursor={column.sortable ? "pointer" : "default"}
              >
                <Flex align="center" justify={column.align || "start"} color="white" pl="4">
                  {column.header}
                  {column.sortable && (
                    <>
                      {sortColumn === column.key && sortDirection === "asc" && (
                        <Icon ml={2}>
                          <IoArrowUp />
                        </Icon>
                      )}
                      {sortColumn === column.key && sortDirection === "desc" && (
                        <Icon ml={2}>
                          <IoArrowDown />
                        </Icon>
                      )}
                    </>
                  )}
                </Flex>
              </Table.ColumnHeader>
            ))}
            {actions && (
              <Table.ColumnHeader w="fit-content" color="white" pl="4">
                Ações
              </Table.ColumnHeader>
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row, i) => (
            <Table.Row key={row.id} bg={i % 2 === 0 ? "taupe.50" : "taupe.100"}>
              {columns.map((column) => (
                <Table.Cell key={String(column.key)} textAlign={column.align || "start"} pl="4">
                  {column.cell ? column.cell(row) : String(row[column.key])}
                </Table.Cell>
              ))}
              {actions && (
                <Table.Cell maxW="fit-content" minW="fit-content">
                  <Flex maxW="fit-content" minW="fit-content">
                    {actions(row)}
                  </Flex>
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {/* Paginação */}
      <Flex mt={4} justifyContent="space-between" alignItems="center">
        <Flex align="center">
          <Text mr={2}>Páginas:</Text>
          <IconButton
            size="sm"
            mr={2}
            onClick={async () => await onPageChange?.(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1 || isLoading}
            aria-label="Página anterior"
          >
            {isLoading ? <Spinner /> : <IoChevronBackOutline />}
          </IconButton>
          <Text mr={2}>
            {currentPage} de {totalPages}
          </Text>
          <IconButton
            size="sm"
            disabled={currentPage === totalPages || isLoading}
            onClick={async () => await onPageChange?.(Math.min(totalPages, currentPage + 1))}
            aria-label="Próxima página"
          >
            {isLoading ? <Spinner /> : <IoChevronForwardOutline />}
          </IconButton>
        </Flex>

        {onRowsPerPageChange && (
          <Flex align="center">
            <Text mr={2}>Linhas por página:</Text>
            <Select
              selectedValue={"10"}
              onChange={() => console.log("On change")}
              label=""
              options={[5, 10, 25, 50].map((item) => ({ label: item.toString(), value: item.toString() }))}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
