import React from "react";

export const TableRow: React.FC<{ row: any }> = ({ row }) => {
  return (
    <tr>
      <td className="p-4 text-left">{row.id}</td>
      <td className="p-4 text-left">{row.batchId}</td>
      <td className="p-4 text-left">{row.assignorId}</td>
      <td className="p-4 text-left">{row.value.toFixed(2)}</td>
      <td className="p-4 text-left">
        {new Date(row.emissionDate).toLocaleDateString()}
      </td>
      <td className="p-4 text-left">{row.errorMessage}</td>
      <td className="p-4 text-left">
        {new Date(row.createdAt).toLocaleDateString()}
      </td>
      <td className="p-4 text-left">
        <button
          className="w-full min-w-[80px] max-w-[80px] rounded-md px-4 py-[8px] text-xs"
          onClick={() => alert(`Editando ${row.id}`)}
        >
          Editar
        </button>
        <button
          className="w-full min-w-[80px] max-w-[80px] rounded-md border border-red-600 bg-white px-4 py-[8px] text-xs"
          onClick={() => alert(`Excluindo ${row.id}`)}
        >
          <span className="text-red-600">Excluir</span>
        </button>
      </td>
    </tr>
  );
};
