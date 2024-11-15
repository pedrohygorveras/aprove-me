import React from "react";
import { FaCheckCircle, FaExclamation, FaTimesCircle } from "react-icons/fa";

export const TableRow: React.FC<{ row: any }> = ({ row }) => {
  return (
    <tr>
      <td className="border px-2 py-2 text-center">{row.id}</td>
      <td className="border px-2 py-2 text-center">
        <div className="flex w-full items-center justify-center">
          {!row.processing ? (
            <FaCheckCircle className="mr-2 h-4 w-4 text-green-500" />
          ) : (
            <FaExclamation className="mr-2 h-4 w-4 text-red-500" />
          )}
          {!row.processing ? "Sim" : "Não"}
        </div>
      </td>
      <td className="item border px-2 py-2 text-center">
        <div className="flex w-full items-center justify-center">
          <span className={`mr-3 block h-2.5 w-2.5 rounded-full bg-green-500`}>
            <span
              className={`block h-2.5 w-2.5 animate-ping rounded-full bg-green-500`}
            ></span>
          </span>
          {row.totalSuccess}
        </div>
      </td>
      <td className="border px-2 py-2 text-center">
        <div className="flex w-full items-center justify-center">
          <span className={`mr-3 block h-2.5 w-2.5 rounded-full bg-red-500`}>
            <span
              className={`block h-2.5 w-2.5 animate-ping rounded-full bg-red-500`}
            ></span>
          </span>
          {row.totalFailed}
        </div>
      </td>
      <td className="border px-2 py-2 text-center">
        {new Date(row.createdAt).toLocaleString("pt-BR", {
          weekday: "short",
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        })}
      </td>
    </tr>
  );
};
