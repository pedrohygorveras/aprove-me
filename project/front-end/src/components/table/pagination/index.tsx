import React from "react";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  handleNext: () => void;
  handlePrev: () => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  handleNext,
  handlePrev,
}) => {
  return (
    <div className="join">
      <button
        className={`px-4 py-3 join-item bg-primary text-white ${
          currentPage === 1 ? "opacity-25" : "hover:bg-blue-700"
        }`}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        «
      </button>
      <button className="join-item px-6">
        Página {currentPage} de {totalPages}
      </button>
      <button
        className={`px-4 py-3 join-item bg-primary text-white ${
          currentPage === totalPages ? "opacity-25" : "hover:bg-blue-700"
        }`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  );
};

export { TablePagination };
