import React from "react";
import { FieldError } from "react-hook-form";

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const DateInput: React.FC<DateInputProps> = ({ label, error, ...props }) => (
  <div>
    <label htmlFor={props.id}>{label}</label>
    <input type="date" {...props} className="border p-2 w-full" />
    {error && <p className="text-sm text-red-500">{error.message}</p>}
  </div>
);

export { DateInput };
