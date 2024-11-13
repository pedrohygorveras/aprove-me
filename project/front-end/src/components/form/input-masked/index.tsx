import React from "react";
import { FieldError } from "react-hook-form";

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  mask: (value: string) => string;
  error?: FieldError;
}

const MaskedInput: React.FC<MaskedInputProps> = ({
  label,
  placeholder,
  mask,
  error,
  ...props
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = mask(e.target.value);
  };

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text font-semibold">{label}</span>
      </div>
      <input
        {...props}
        onChange={handleInputChange}
        className={`input border border-input w-full focus:outline-none ${
          error ? "input-error" : ""
        }`}
        placeholder={placeholder}
        aria-invalid={!!error}
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

export { MaskedInput };
