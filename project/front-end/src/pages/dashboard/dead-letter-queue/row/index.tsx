import React from "react";

export const TableRow: React.FC<{ row: any }> = ({ row }) => {
  return (
    <tr>
      <td className="border px-2 py-2 text-center">
        <div
          className="tooltip tooltip-right max-w-[80px] cursor-pointer truncate"
          title={row.batchId}
        >
          {row.batchId}
        </div>
      </td>
      <td className="border px-2 py-2 text-center">
        <div
          className="tooltip tooltip-right max-w-[80px] cursor-pointer truncate"
          title={row.assignorId}
        >
          {row.assignorId}
        </div>
      </td>
      <td className="min-w-[100px] border px-2 py-2 text-center">
        {row.value}
      </td>
      <td className="border px-2 py-2 text-center">
        <div className="tooltip tooltip-right">
          {new Date(row.emissionDate).toLocaleDateString()}
        </div>
      </td>
      <td className="border px-2 py-2 text-center">
        <div
          className="tooltip tooltip-right max-w-[100px] cursor-pointer truncate"
          title={row.errorMessage}
        >
          <span className="text-xs">{row.errorMessage}</span>
        </div>
      </td>
      <td className="border px-2 py-2 text-center">
        <div className="tooltip tooltip-right">
          {new Date(row.createdAt).toLocaleString("pt-BR", {
            weekday: "short",
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
        </div>
      </td>
    </tr>
  );
};
