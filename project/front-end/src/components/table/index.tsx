import React from "react";
import { TableHeader } from "./header";

interface TableProps {
  columns: string[];
  data: any[];
  Row: any;
}

const Table: React.FC<TableProps> = ({ columns, data, Row }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border">
        <TableHeader columns={columns} />
        <tbody>
          {data.map((row: any, index: number) => (
            <Row row={row} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Table };
