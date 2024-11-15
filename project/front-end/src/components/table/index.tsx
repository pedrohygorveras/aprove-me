/* eslint-disable  @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { TableHeader } from "./header";
import { TablePagination } from "./pagination";
import { TableSearch } from "./search";

interface TableProps {
  columns: string[];
  data: any[];
  totalPages: number;
  Row: any;
}

const Table: React.FC<TableProps> = ({ columns, data, totalPages, Row }) => {
  const [search, setSearch] = useState("");
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [limit, setLimit] = useState(50);
  const currentPage = 1;

  const handleNext = () => {};

  const handlePrev = () => {};

  return (
    <div className="w-full">
      <div className="">
        <TableSearch search={search} setSearch={setSearch} />

        <div className="w mb-8 mt-6 flex justify-end md:min-w-[225px]">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border">
          <TableHeader columns={columns} />
          <tbody>
            {data.map((row: any, index: number) => {
              return <Row row={row} key={index} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="w mt-8 flex justify-center md:min-w-[225px]">
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </div>
    </div>
  );
};

export { Table };
