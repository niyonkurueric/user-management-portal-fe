"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  topLeft?: React.ReactNode;
  topRight?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns = [],
  data = [],
  topLeft,
  topRight,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const headerGroups = table?.getHeaderGroups?.() ?? [];
  const rowModel = table?.getRowModel?.();
  const rows = rowModel?.rows ?? [];

  return (
    <div className="rounded-md border">
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex-1">{topLeft}</div>
        <div className="ml-4">{topRight}</div>
      </div>

      <Table>
        <TableHeader>
          {headerGroups.map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : header.column.columnDef.header
                      ? flexRender(header.column.columnDef.header, header.getContext())
                      : header.id}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-gray-500"
              >
                No results found.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.columnDef.cell
                      ? flexRender(cell.column.columnDef.cell, cell.getContext())
                      : String(cell.getValue() ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
