import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  error,
  value,
  onChange,
  ...props
}) => {
  return (
    <label className="form-control mb-3 w-full">
      <div className="label pb-1">
        <span className="label-text text-xs font-semibold">{label}</span>
      </div>
      <input
        {...props}
        className={`input w-full border border-input focus:outline-none ${
          error ? "input-error" : ""
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && (
        <div className="label pb-0 pt-0.5">
          <span className="label-text-alt text-sm text-red-500">{error}</span>
        </div>
      )}
    </label>
  );
};

export { Input };
