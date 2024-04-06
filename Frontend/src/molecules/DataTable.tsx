import { useState, useEffect } from "react";

import { TableColumnType } from "../types/TableColumnType";
import { Table, Tbody, TableContainer, Flex } from "@chakra-ui/react";
import { TableRow } from "../atoms/TableRow";
import { TableHeader } from "../atoms/TableHeader";
import { TablePagination } from "../atoms/TablePagination";
import { SearchField } from "../atoms/SearchField";

interface IDataTableProps {
    items: {
        id: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    }[];
    columns: TableColumnType[];
    paginate?: boolean;
}

export function DataTable({ items, columns, paginate }: IDataTableProps) {
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
        <Flex direction="column" w="100%" gap="1rem">
            <SearchField w="320px" colorScheme="pink" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            <TableContainer w="100%" border="1px solid black" rounded="lg">
                <Table size="lg">
                    <TableHeader columns={columns} />
                    <Tbody>
                        {
                            filteredItems.slice((currentPage - 1) * 10, currentPage * 10).map((item) => (
                                <TableRow key={item.id} rowData={item} columns={columns} />
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
                                goToLastPage={() => setCurrentPage(maxPages)}
                            />
                        )
                    }
                </Table>
            </TableContainer>
        </Flex>
    )
}