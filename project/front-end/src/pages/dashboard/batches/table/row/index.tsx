import React from "react";

export const TableRow: React.FC<{ row: any }> = ({ row }) => {
  return (
    <tr>
      <td className="p-4 text-left">{row.id}</td>
      <td className="p-4 text-left">{row.processing ? "Sim" : "Não"}</td>
      <td className="p-4 text-left">{row.totalSuccess}</td>
      <td className="p-4 text-left">{row.totalFailed}</td>
      <td className="p-4 text-left">{row.total}</td>
      <td className="p-4 text-left">
        {new Date(row.createdAt).toLocaleDateString()}
      </td>
      <td className="p-4 text-left">
        <button
          className="btn btn-primary btn-sm mr-2"
          onClick={() => alert(`Editando ${row.id}`)}
        >
          Editar
        </button>
        <button
          className="btn-danger btn btn-sm"
          onClick={() => alert(`Excluindo ${row.id}`)}
        >
          Excluir
        </button>
      </td>
    </tr>
  );
};
