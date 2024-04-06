import { TableColumnType } from "../types/TableColumnType"
import { Tr, Td } from "@chakra-ui/react";

interface ITableRowProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rowData: any;
    columns: TableColumnType[];
}

export function TableRow({ rowData, columns }: ITableRowProps) {
    return (
        <Tr w="100%">
            {
                columns.map((column) => (
                    <Td key={column.name} p="1rem 0" textAlign="center">
                        {rowData[column.propertyName]}
                    </Td>
                ))
            }
        </Tr>
    )
}