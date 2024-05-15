import React from "react";
import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Checkbox from "@mui/joy/Checkbox";
import Avatar from "@mui/joy/Avatar";
import Typography from "@mui/joy/Typography";
import RowMenu from "./row-menu";

interface TableProps {
  data: any[];
  columns: {
    name: string;
    key: string;
    width?: number | string;
    renderCell?: (value: any, row: any) => React.ReactNode;
  }[];
  onRowClick?: (row: any) => void;
  selectedRows: string[];
  onSelectAllRows: (checked: boolean) => void;
  onSelectRow: (rowId: string, checked: boolean) => void;
}

const ReusableTable: React.FC<TableProps> = ({
  data,
  columns,
  onRowClick,
  selectedRows,
  onSelectAllRows,
  onSelectRow,
}) => {
  const isAllRowsSelected = selectedRows?.length === data.length;
  const isIndeterminate = selectedRows?.length > 0 && !isAllRowsSelected;

  return (
    <Table
      aria-labelledby="tableTitle"
      stickyHeader
      hoverRow
      sx={{
        "--TableCell-headBackground": "var(--joy-palette-background-level1)",
        "--Table-headerUnderlineThickness": "1px",
        "--TableRow-hoverBackground": "var(--joy-palette-background-level1)",
        "--TableCell-paddingY": "4px",
        "--TableCell-paddingX": "8px",
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              width: 40,
              textAlign: "center",
              padding: "12px 6px",
            }}
          >
            <Checkbox
              size="sm"
              indeterminate={isIndeterminate}
              checked={isAllRowsSelected}
              onChange={(event) => onSelectAllRows(event.target.checked)}
              color={
                isIndeterminate || isAllRowsSelected ? "primary" : undefined
              }
              sx={{ verticalAlign: "text-bottom" }}
            />
          </th>
          {columns.map((column) => (
            <th
              key={column.name}
              style={{
                width: column.width || "auto",
                padding: "12px 6px",
              }}
            >
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr
            key={row.id}
            onClick={() => onRowClick && onRowClick(row)}
            style={{
              cursor: onRowClick ? "pointer" : "default",
            }}
          >
            <td style={{ textAlign: "center", width: 120 }}>
              <Checkbox
                size="sm"
                checked={selectedRows?.includes(row.id)}
                color={selectedRows?.includes(row.id) ? "primary" : undefined}
                onChange={(event) => onSelectRow(row.id, event.target.checked)}
                slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                sx={{ verticalAlign: "text-bottom" }}
              />
            </td>
            {columns.map((column) => (
              <td key={column.key}>
                {column.renderCell
                  ? column.renderCell(row[column.key], row)
                  : row[column.key]}
              </td>
            ))}
            <td style={{ textAlign: "center", width: 120 }}>
              <RowMenu />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ReusableTable;
