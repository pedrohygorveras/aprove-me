import React, { useState } from "react";
import { Button } from "../button";
import { MdAdd } from "react-icons/md";
import { payableService } from "@/services/payable";

interface ContentProps {
  children: React.ReactNode;
  className?: string;
  urlCreate?: string;
  batch?: boolean;
}

const Content: React.FC<ContentProps> = ({
  children,
  className,
  urlCreate,
  batch = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleBatchUpload = async () => {
    setErrorMessage("");
    if (!file) {
      setErrorMessage("Por favor, selecione um arquivo JSON.");
      return;
    }

    try {
      const fileContent = await file.text();
      const jsonData = JSON.parse(fileContent);

      if (!Array.isArray(jsonData)) {
        setErrorMessage("O arquivo JSON deve conter uma lista de objetos.");
        return;
      }

      await payableService.createBatchWithQueue(jsonData);
      alert("Lote enviado com sucesso!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao enviar o lote:", error);
      setErrorMessage(
        "Erro ao processar o arquivo. Verifique o formato e tente novamente."
      );
    }
  };

  return (
    <div className="bg-neutral-300">
      <div className="page pt-8">
        <div className="flex items-center justify-end space-x-3">
          {urlCreate && (
            <div className="text-right">
              <Button href={urlCreate} className="min-w-[160px] max-w-[160px]">
                <div className="flex items-center justify-center">
                  NOVO
                  <MdAdd className="ml-2 text-lg" />
                </div>
              </Button>
            </div>
          )}
          {batch && (
            <div className="text-right">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="min-w-[160px] max-w-[160px] px-4"
              >
                <div className="flex items-center justify-center text-nowrap">
                  LOTE DE DADOS
                  <MdAdd className="ml-2 text-lg" />
                </div>
              </Button>
            </div>
          )}
        </div>
        <div className={`rounded-t-lg bg-paper p-6 shadow-md ${className}`}>
          {children}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Enviar Lote de Dados
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Selecione um arquivo JSON contendo os dados para o lote.
            </p>

            <div className="mt-4">
              <input
                type="file"
                accept=".json"
                className="block w-full text-sm text-gray-600"
                onChange={handleFileChange}
              />
            </div>

            <div className="mt-6">
              <div className="accordion">
                <button
                  className="w-full text-left font-semibold text-blue-600 hover:underline"
                  onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                >
                  Exibir exemplo do JSON
                </button>
                {isAccordionOpen && (
                  <pre className="mt-4 rounded-md bg-gray-100 p-4 text-xs text-gray-800">
                    {`[
  {
    "assignorId": "3c5aa1a...",
    "value": 1,
    "emissionDate": "2024-01-01T00:00:00Z"
  },
  {
    "assignorId": "4c5aa1a...",
    "value": 2,
    "emissionDate": "2024-01-01T00:00:00Z"
  }
]`}
                  </pre>
                )}
              </div>
            </div>

            {errorMessage && (
              <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            )}

            <div className="mt-6 flex justify-end gap-4">
              <button
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                onClick={handleBatchUpload}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Content };
