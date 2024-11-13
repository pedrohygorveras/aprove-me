import React from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  error?: FieldError;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  error,
  ...props
}) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text font-semibold">{label}</span>
      </div>
      <input
        {...props}
        className={`input border border-input w-full focus:outline-none ${
          error && "input-error"
        }`}
        placeholder={placeholder}
      />
      {error && (
        <div className="label pb-0 pt-0.5">
          <span className="label-text-alt text-red-500 text-sm">
            {error.message}
          </span>
        </div>
      )}
    </label>
  );
};

export { Input };
