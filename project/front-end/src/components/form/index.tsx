/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";

import {
  useForm,
  SubmitHandler,
  FieldValues,
  Path,
  FieldError,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "./input";
import { MaskedInput } from "./input-masked";
import { DateInput } from "./dateinput";
import { RadioGroup } from "./radio";
import { Select } from "./select";
import { Textarea } from "./textarea";
import { Button } from "../button";
import * as yup from "yup";
import { MdArrowForward } from "react-icons/md";

interface Field<T> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type:
    | "text"
    | "email"
    | "masked"
    | "checkbox"
    | "radio"
    | "select"
    | "textarea"
    | "password"
    | "date";
  mask?: (value: string) => string;
  options?: { label: string; value: string }[];
}

interface FormProps<T extends FieldValues> {
  fields: Field<T>[];
  schema: yup.ObjectSchema<any>;
  onSubmit: SubmitHandler<T>;
  buttonTitle?: string;
}

const Form = <T extends FieldValues>({
  fields,
  schema,
  onSubmit,
  buttonTitle,
}: FormProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<T>({
    resolver: yupResolver(schema),
  });

  const onError = (errors: any) => {
    console.error("Erros de validação:", errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
      {fields.map((field) => {
        const error = errors[field.name as Path<T>] as FieldError | undefined;

        return (
          <div key={field.name}>
            {field.type === "text" ||
            field.type === "email" ||
            field.type === "password" ? (
              <Input
                label={field.label}
                placeholder={field.placeholder}
                type={field.type}
                {...register(field.name)}
                error={error}
              />
            ) : field.type === "masked" && typeof field.mask === "function" ? (
              <MaskedInput
                label={field.label}
                placeholder={field.placeholder}
                mask={field.mask}
                {...register(field.name)}
                error={error}
              />
            ) : field.type === "radio" && field.options ? (
              <RadioGroup
                label={field.label}
                options={field.options}
                {...register(field.name)}
                error={error}
              />
            ) : field.type === "select" && field.options ? (
              <Select
                label={field.label}
                options={field.options}
                {...register(field.name)}
                error={error}
              />
            ) : field.type === "textarea" ? (
              <Textarea
                label={field.label}
                {...register(field.name)}
                error={error}
              />
            ) : field.type === "date" ? (
              <DateInput
                label={field.label}
                {...register(field.name)}
                error={error}
              />
            ) : null}
          </div>
        );
      })}

      <div className="text-center pt-6">
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          <div className="flex items-center justify-center">
            {buttonTitle ? buttonTitle : "Salvar"}
            <MdArrowForward className="text-lg ml-2" />
          </div>
        </Button>
      </div>
    </form>
  );
};

export { Form };
