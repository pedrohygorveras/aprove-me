import React from "react";

interface TableSearchProps {
  search: string;
  setSearch: any;
}

const TableSearch: React.FC<TableSearchProps> = ({ search, setSearch }) => {
  return (
    <label className="form-control ml-auto w-full max-w-xs rounded-lg border border-input">
      <div className="flex items-center">
        <input
          type="text"
          className="input w-full focus:border-none focus:outline-none"
          placeholder="Pesquisar"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="mr-4 h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </label>
  );
};

export { TableSearch };
