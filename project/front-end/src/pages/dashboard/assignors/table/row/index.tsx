"use client";

import React, { useState } from "react";
import { Button } from "@/components/button";
import { assignorService } from "@/services/assignor";

interface TableRowProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  createdAt: string;
  updated: string;
}

const TableRow: React.FC<{ row: TableRowProps }> = ({ row }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await assignorService.deleteAssignor(row.id);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao excluir o cedente:", error);
      alert("Não foi possível excluir o cedente. Tente novamente.");
    }
  };

  return (
    <>
      <tr key={row.id}>
        <td className="border px-2 py-2 text-left">{row.name}</td>
        <td className="border px-2 py-2 text-left">{row.email}</td>
        <td className="border px-2 py-2 text-center">{row.phone}</td>
        <td className="border px-2 py-2 text-center">{row.document}</td>
        <td className="w-24 border px-2 py-2 text-left">
          <div className="flex flex-row items-center justify-center gap-1">
            <Button
              className="w-20 min-w-20 px-4 py-1.5 text-xs"
              href={`/dashboard/assignors/add/${row.id}`}
            >
              Editar
            </Button>
            <Button
              className="w-20 min-w-20 border border-red-600 bg-white px-4 py-1.5 text-xs text-red-600"
              onClick={() => setIsModalOpen(true)}
            >
              Excluir
            </Button>
          </div>
        </td>
      </tr>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Confirmar Exclusão
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Tem certeza de que deseja excluir este cedente? Esta ação não pode
              ser desfeita.
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                onClick={handleDelete}
              >
                Sim, excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { TableRow };
