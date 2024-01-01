'use client';

import { PaginationState } from '@/typings/data-table.type';
import { Input, Pagination, Select } from '@mantine/core';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  Table,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import * as React from 'react';
import PaginationForm from './PaginateForm';
import TableSkeleton from './TableSkeleton';
interface Props {
  data: any;
  columns: ColumnDef<any>[];
  searchKey?: string;
  searchElement?: React.ReactNode;
  paginationProps?: PaginationState;
  actionElement?: React.ReactNode;
  minW?: string;
  tableClass?: string;
  renderCustomElement?: (table: Table<any>) => React.ReactNode;
  noDataMessage?: React.ReactNode;
  loading?: boolean;
  loader?: React.ReactNode;
  limit?: number;
}

export function DataTable({
  data,
  columns,
  searchKey,
  searchElement,
  paginationProps,
  actionElement,
  minW,
  tableClass,
  renderCustomElement,
  noDataMessage,
  loading,
  limit,
  loader,
}: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: paginationProps?.paginateOpts.page ?? 0,
    pageSize: paginationProps?.paginateOpts.limit ?? limit ?? 10,
  });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const newColumns: ColumnDef<any>[] = [
    // {
    //   id: 'select',
    //   header: ({ table }) => (
    //     <input
    //       type="checkbox"
    //       checked={table.getIsAllPageRowsSelected()}
    //       onChange={(value) => table.toggleAllPageRowsSelected(!!value.target.checked)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <input
    //       type="checkbox"
    //       className=" mx-auto"
    //       checked={row.getIsSelected()}
    //       onChange={(value) => {
    //         row.toggleSelected(!!value.target.checked);
    //       }}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    ...columns,
  ];

  const table = useReactTable({
    data,
    columns: newColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    debugTable: true,
    onPaginationChange: setPagination,
    manualPagination: paginationProps?.isPaginated,
    // paginateExpandedRows: true,
    enableGlobalFilter: true,
  });
  const isPaginated = paginationProps?.isPaginated ?? false;

  const onPaginate = (page: number) => {
    if (isPaginated) {
      paginationProps?.setPaginateOpts({
        ...paginationProps?.paginateOpts,
        page,
      });
      return;
    }
    table?.setPageIndex(page);
  };

  // console.log('table state', paginationProps?.paginateOpts?.limit);

  return (
    <div className="w-full text-sm">
      {renderCustomElement && renderCustomElement(table)}
      <div className="flex w-full justify-between gap-x-2">
        {searchElement ? (
          searchElement
        ) : searchKey ? (
          <div className="flex w-full items-center py-4">
            <Input
              type="text"
              placeholder={`Search ...`}
              value={table.getState().globalFilter ?? ''}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              className="lg:max-w-xs max-w-[16em] w-full rounded-md duration-300"
            />
          </div>
        ) : (
          <div></div>
        )}
        {actionElement && actionElement}
      </div>
      {loading ? (
        loader ?? <TableSkeleton columns={columns} />
      ) : (
        <>
          <div className={` w-full overflow-auto ${tableClass}`}>
            <table style={{ minWidth: minW ?? 700 }} className=" w-full ">
              <thead className=" text-mainPurple">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr className=" bg-[#EDEEF3]  " key={headerGroup.id}>
                    {headerGroup.headers.map((header, i) => {
                      return (
                        <td
                          className={clsx(
                            'p-2 font-semibold py-3 whitespace-nowrap',
                            i == 0 && 'rounded-l-xl pl-4',
                            i == headerGroup.headers.length - 1 && 'rounded-r-xl pr-4',
                          )}
                          key={header.id}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table?.getRowModel().rows?.length ? (
                  table?.getRowModel().rows.map((row, i) => (
                    <tr
                      className={`rounded-md overflow-hidden ${
                        i % 2 !== 0 ? 'bg-[#4343430f]' : 'bg-[#43434308]'
                      }  border-2 border-[#F7F8FD]`}
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell, i) => (
                        <td
                          className={clsx(
                            `p-2 py-2 `,
                            row.getIsSelected() ? 'bg-mainPurple text-white font-semibold' : '',
                            i === 0 && 'rounded-l-xl pl-4',
                            i === row.getVisibleCells().length - 1 && 'rounded-r-xl pr-4',
                          )}
                          key={cell.id}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length + 2}
                      className="h-24 text-center text-gray-700 text-lg"
                    >
                      {noDataMessage ?? 'No Data So far ...'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table?.getFilteredSelectedRowModel().rows.length} of{' '}
              {table?.getFilteredRowModel().rows.length} row(s) selected.
            </div>
          </div>
          <div className="flex w-full justify-center">
            <Pagination
              total={
                isPaginated ? paginationProps?.paginateOpts?.totalPages ?? 1 : table?.getPageCount()
              }
              onNextPage={() => {
                if (isPaginated) {
                  paginationProps?.setPaginateOpts({
                    ...paginationProps?.paginateOpts,
                    page: (paginationProps?.paginateOpts?.page ?? 0) + 1,
                  });
                  return;
                }
                table?.nextPage();
              }}
              value={
                isPaginated
                  ? (paginationProps?.paginateOpts?.page ?? 0) + 1
                  : table?.getState().pagination.pageIndex + 1
              }
              onPreviousPage={() => {
                if (isPaginated) {
                  paginationProps?.setPaginateOpts({
                    ...paginationProps?.paginateOpts,
                    page: (paginationProps?.paginateOpts?.page ?? 0) - 1,
                  });
                  return;
                }
                table?.previousPage();
              }}
              onChange={(page) => {
                console.log(page);
                onPaginate(page - 1);
              }}
            />
          </div>
          <div className="flex sm:flex-row flex-col text-sm items-center mt-3 gap-2 justify-center">
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {isPaginated
                  ? (paginationProps?.paginateOpts.page ?? 0) + 1
                  : table?.getState().pagination.pageIndex + 1}
                of {isPaginated ? paginationProps?.paginateOpts.totalPages : table?.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              | Go to page:
              <PaginationForm
                pageIndex={
                  isPaginated
                    ? paginationProps?.paginateOpts.page ?? 0 + 1
                    : table?.getState().pagination.pageIndex + 1
                }
                onPaginate={onPaginate}
              />
            </span>
            <div className="flex items-center gap-x-2">
              <span>Show</span>
              <Select
                size="xs"
                // label="Your favorite library"
                placeholder="Pick Page Size"
                data={[5, 10, 20, 30, 40, 50, 100, 200, 500].map((val) => String(`${val}`))}
                value={
                  isPaginated
                    ? String(paginationProps?.paginateOpts?.limit ?? 0)
                    : table?.getState().pagination.pageSize.toString()
                }
                onChange={(value) => {
                  // remove 'show' from value and
                  const newValue = value?.replace('', '');
                  if (!newValue) return;
                  if (isPaginated) {
                    paginationProps?.setPaginateOpts({
                      ...paginationProps?.paginateOpts,
                      limit: Number(newValue),
                    });
                    return;
                  }
                  table?.setPageSize(Number(newValue));
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
