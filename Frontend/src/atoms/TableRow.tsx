import { TableColumnType } from "../types/tableColumnType"
import { Tr, Td, TableCellProps } from "@chakra-ui/react";

interface ITableRowProps extends TableCellProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rowData: any;
    columns: TableColumnType[];
}

export function TableRow({ rowData, columns, ...rest }: ITableRowProps) {
    return (
        <Tr w="100%">
            {
                columns.map((column) => (
                    <Td key={column.name} p="1rem 0" textAlign="center" {...rest}>
                        {rowData[column.propertyName]}
                    </Td>
                ))
            }
        </Tr>
    )
}