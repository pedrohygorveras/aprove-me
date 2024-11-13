import React from "react";

interface TableHeaderProps {
  columns: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <th className="border py-2 px-2 text-sm text-center" key={col}>
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export { TableHeader };
