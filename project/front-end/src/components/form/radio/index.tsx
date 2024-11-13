import React from "react";
import { FieldError } from "react-hook-form";

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  error?: FieldError;
}

const RadioGroup: React.FC<
  RadioGroupProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({ label, name, options, error, ...props }) => (
  <div>
    <label>{label}</label>
    <div className="flex space-x-4">
      {options.map((option) => (
        <label key={option.value} className="flex items-center space-x-2">
          <input type="radio" name={name} value={option.value} {...props} />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
    {error && <p className="text-red-500">{error.message}</p>}
  </div>
);

export { RadioGroup };
