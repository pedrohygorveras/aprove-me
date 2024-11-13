import React from "react";
import { FieldError } from "react-hook-form";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: FieldError;
}

const Textarea: React.FC<TextareaProps> = ({ label, error, ...props }) => (
  <div>
    <label htmlFor={props.id}>{label}</label>
    <textarea {...props} className="border p-2 w-full" />
    {error && <p className="text-red-500">{error.message}</p>}
  </div>
);

export { Textarea };
