import React from "react";
import { FieldError } from "react-hook-form";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: FieldError;
}

const Select: React.FC<SelectProps> = ({ label, options, error, ...props }) => (
  <div>
    <label htmlFor={props.id}>{label}</label>
    <select {...props} className="border p-2 w-full">
      <option value="">Selecione uma opção</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500">{error.message}</p>}
  </div>
);

export { Select };
