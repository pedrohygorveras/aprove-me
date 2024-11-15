import React from "react";
import { FieldError } from "react-hook-form";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: FieldError | string;
  helperText?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  helperText,
  ...props
}) => {
  const hasError = Boolean(error);
  const errorMessage = typeof error === "string" ? error : error?.message;

  return (
    <div className="form-control mb-3 w-full">
      <label htmlFor={props.id} className="label pb-1">
        <span className="label-text text-xs font-semibold">{label}</span>
      </label>
      <select
        {...props}
        className={`select w-full border border-input focus:outline-none ${
          hasError ? "select-error border-red-500" : ""
        }`}
      >
        <option value="" disabled>
          Selecione uma opção
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && !hasError && (
        <p className="label-text-alt text-sm text-gray-500">{helperText}</p>
      )}
      {hasError && (
        <p className="label-text-alt text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export { Select };
