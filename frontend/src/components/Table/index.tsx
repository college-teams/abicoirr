/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import { useTable, usePagination, useSortBy, Column } from "react-table";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Config from "../../types/react-table-config";
import { Icon } from "@iconify/react";
import Loader from "../Loader";

interface TableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
}

const Table = <T extends object>({
  data,
  columns,
  loading,
}: TableProps<T>): JSX.Element => {
  const tableData = useMemo(() => data, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    // nextPage,
    gotoPage,
    setPageSize,
    pageCount,
    pageOptions,
    // previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: tableData,
    },

    useSortBy,
    usePagination
  );

  const onPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const val =
        Number(e.target.value) - 1 > 0 ? Number(e.target.value) - 1 : 0;
      gotoPage(val);
    }
  };

  const onPageBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const val = e.target.value ? Number(e.target.value) : 0;
    if (val < 1 || val > pageOptions.length) {
      e.target.value = String(val);
    }
  };

  return (
    <div>
      <div className="relative mb-5">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span className="relative inline-block">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <Icon icon="mdi:arrow-drop-up" />
                        ) : (
                          <Icon icon="mdi:arrow-down-drop" />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {!loading && (
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>

        {loading && (
          <div className="relative w-full pt-8 flex items-center justify-center">
            <Loader />
          </div>
        )}

        {!loading && data?.length == 0 && (
          <div className="relative w-full py-4 flex items-center justify-center text-[1.6rem] font-medium border border-t-0 border-gray-600">
            No data to show
          </div>
        )}
      </div>

      <div className="relative flex  items-center gap-7 justify-end py-7 px-7">
        {data.length > 0 && (
          <>
            <div className="relative flex gap-4 items-center justify-between">
              <button
                className={`relative text-black bg-[#3068ec] text-white text-[3rem] ${
                  !canPreviousPage ? "opacity-60 pointer-events-none" : ""
                }`}
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <Icon icon="ri:arrow-left-double-line" />
              </button>

              {/* <button
            className="relative text-black bg-white text-[2.5rem]"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <Icon icon="fluent:ios-arrow-left-24-filled" />
          </button> */}

              {/* TODO: OLD WORKING CODE with .... */}

              {/* <div className="relative flex gap-3 items-center">
                {pageOptions.map((page, index) => {
                  if (
                    index === 0 ||
                    index === pageOptions.length - 1 ||
                    Math.abs(pageIndex - index) <= 1
                  ) {
                    return (
                      <button
                        key={index}
                        onClick={() => gotoPage(index)}
                        className={`relative text-black text-[2rem] px-5 border ${
                          pageIndex === index
                            ? "bg-[#3068ec] text-white"
                            : "bg-white"
                        }`}
                      >
                        {index + 1}
                      </button>
                    );
                  }
                  if (Math.abs(pageIndex - index) === 2) {
                    return (
                      <span
                        className="relative text-black text-[2rem] px-1 border"
                        key="ellipsis"
                      >
                        .....
                      </span>
                    );
                  }
                  return null;
                })}
              </div> */}

              {/* NEW CODE but ... is not coming */}
              <div className="relative flex gap-3 items-center">
                {pageOptions.map((page, index) => {
                  if (
                    index === 0 ||
                    index === pageOptions.length - 1 ||
                    index === pageIndex ||
                    Math.abs(pageIndex - index) <= 3
                  ) {
                    return (
                      <button
                        key={index}
                        onClick={() => gotoPage(index)}
                        className={`relative text-black text-[2rem] px-5 border ${
                          pageIndex === index
                            ? "bg-[#3068ec] text-white"
                            : "bg-white"
                        }`}
                      >
                        {index + 1}
                      </button>
                    );
                  }
                  if (pageIndex - index === 3) {
                    return (
                      <span
                        className="relative text-black text-[2rem] px-1 border"
                        key="ellipsis"
                      >
                        .....
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              {/* <button
            className="relative text-black bg-white text-[3.5rem]"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <Icon icon="solar:alt-arrow-right-outline" />
          </button> */}

              <button
                className={`relative text-black bg-[#3068ec] text-white text-[3rem] ${
                  !canNextPage ? "opacity-60 pointer-events-none" : ""
                }`}
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <Icon icon="ri:arrow-right-double-line" />
              </button>
            </div>
            <span className="relative text-[2rem]">{"|"}</span>
          </>
        )}

        <div>
          <span className="relative mr-5 text-xl">Page</span>
          <strong className="relative text-xl">
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </div>

        <span className="relative text-[2rem]">{"|"}</span>

        <div>
          <input
            type={"number"}
            min={1}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onBlur={onPageBlur}
            onChange={onPageChange}
            className="relative px-4 py-1 text-black text-2xl border"
          />
        </div>
        <span className="relative text-[2rem]">{"|"}</span>

        <div>
          <select
            className="relative px-4 py-2 text-xl font-medium border-2"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 20, 50, 100, 200, 500].map((e: number) => (
              <option className="relative border-b-2" key={e} value={e}>
                Show {e}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Table;
