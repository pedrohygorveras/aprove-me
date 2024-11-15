/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";

import React from "react";

import { Table } from "@/components/table";
import { Loading } from "@/components/loading";
import { columns } from "./columns";
import { TableRow } from "./row";
import { FaFile } from "react-icons/fa";

interface TablePageProps {
  data: any[] | any;
}

const TablePage: React.FC<TablePageProps> = ({ data }) => {
  return data ? (
    data.length > 0 ? (
      <Table columns={columns} data={data} totalPages={1} Row={TableRow} />
    ) : (
      <div className="flex flex-col items-center justify-center text-center">
        <FaFile className="text-5xl mb-5" />
        <h3 className="text-xl font-semibold">Nenhum registro adicionado.</h3>
      </div>
    )
  ) : (
    <Loading />
  );
};

export default TablePage;
