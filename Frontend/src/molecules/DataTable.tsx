import { useState, useEffect } from "react";

import { TableColumnType } from "../types/TableColumnType";
import { Table, Tbody, TableContainer, Flex, Text } from "@chakra-ui/react";
import { TableRow } from "../atoms/TableRow";
import { TableHeader } from "../atoms/TableHeader";
import { TablePagination } from "../atoms/TablePagination";
import { SearchField } from "../atoms/SearchField";
import { Button } from "../atoms/Button";
import { EHierarchyStyle } from "../constants/EHierarchyStyle";
import { TableTitleButtonsType } from "../types/TableTitleButtonType";

interface IDataTableProps {
    title: string;
    items: {
        id: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    }[];
    titleButtons?: TableTitleButtonsType[];
    columns: TableColumnType[];
    paginate?: boolean;
}

export function DataTable({ title, items, titleButtons, columns, paginate }: IDataTableProps) {
    const [currentPage, setCurrentPage] = useState(1);  
    const [searchValue, setSearchValue] = useState("");
    const [filteredItems, setFilteredItems] = useState(items);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [pageAmount, setPageAmount] = useState(Math.ceil(items.length / itemsPerPage));

    useEffect(() => {
        if (searchValue === "") {
            setFilteredItems(items);
        } else {
            setFilteredItems(items.filter((item) => {
                return Object.values(item).some((value) => {
                    return value.toString().toLowerCase().includes(searchValue.toLowerCase());
                });
            }));
        }
    }, [searchValue, items]);

    useEffect(() => {  
        setPageAmount(Math.ceil(filteredItems.length / itemsPerPage));
    }, [itemsPerPage, filteredItems]);

    return (
        <Flex direction="column" w="100%" gap="1rem" align="flex-end">
            <Flex w="100%" justify="space-between">
                <Flex gap="4">
                    <Text fontSize="2xl" fontWeight="bold">{title}</Text>
                    <Flex gap="2">
                    {
                        titleButtons?.map((button, index) => (
                            <Button key={index} title={button.title} leftIcon={button.leftIcon} rightIcon={button.rightIcon} type={button.hierarchy} onClick={button.onClick} />
                        ))
                    }
                    </Flex>
                </Flex>
                <SearchField w="320px" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            </Flex>
            <TableContainer w="100%" border="1px solid" borderColor="primary.500" rounded="lg">
                <Table size="lg">
                    <TableHeader columns={columns} />
                    <Tbody>
                        {
                            filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
                                <TableRow key={item.id} rowData={item} columns={columns} bg={index % 2 ? "primary.100" : "primary.50"} borderBottomColor="primary.500" />
                            ))
                        }
                    </Tbody>
                    {
                        paginate && (
                            <TablePagination
                                currentPage={currentPage}
                                totalPages={pageAmount}
                                totalItems={filteredItems.length}
                                itemsPerPage={itemsPerPage}
                                columnsAmount={columns.length}
                                goToFirstPage={() => setCurrentPage(1)}
                                goToPreviousPage={() => setCurrentPage(currentPage - 1)}
                                goToNextPage={() => setCurrentPage(currentPage + 1)}
                                goToLastPage={() => setCurrentPage(pageAmount)}
                            />
                        )
                    }
                </Table>
            </TableContainer>
        </Flex>
    )
}