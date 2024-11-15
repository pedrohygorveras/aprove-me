import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { authService } from "@/services/auth";
import { Button } from "@/components/button";
import { MdArrowForward } from "react-icons/md";
import { Input } from "@/components/form/input";
import { getErrorMessage } from "@/util/erros";
import { setUser } from "@/util/store";

const Login: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async () => {
    setErrorMessage("");
    try {
      const result: any = await authService.login(
        formik.values?.username,
        formik.values?.password
      );

      if (result.error) {
        setErrorMessage(getErrorMessage(result.statusCode));
        return;
      }

      setUser(result);
      window.location.href = "/dashboard/assignors";
    } catch (error: any) {
      setErrorMessage(getErrorMessage(error.statusCode));
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Digite seu nome de usuário."),
    password: Yup.string().required("Digite sua senha de acesso."),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <div className="grid min-h-screen grid-cols-12 items-start sm:items-stretch">
      <div className="bg-auth col-span-12 py-12 sm:col-span-5 md:col-span-7 lg:col-span-8"></div>
      <div className="col-span-12 flex flex-col items-center justify-center bg-white p-8 sm:col-span-7 md:col-span-5 lg:col-span-4">
        <div className="w-full max-w-md">
          <h2 className="mb-3 text-center text-2xl font-bold text-gray-700">
            Bem vindo novamente
          </h2>
          <p className="text-center text-sm text-gray-500">
            Faça seu login para continuar
          </p>
          <div className="py-8">
            <form onSubmit={formik.handleSubmit}>
              <Input
                id="username"
                name="username"
                label="Nome de usuário:"
                placeholder="Digite um nome"
                type="text"
                error={formik?.errors?.username}
                value={formik?.values?.username || ""}
                onChange={formik?.handleChange}
                autoComplete="new-username"
              />
              <Input
                id="password"
                name="password"
                label="Senha de acesso:"
                placeholder="Digite sua senha"
                type="password"
                error={formik?.errors?.password}
                value={formik?.values?.password || ""}
                onChange={formik?.handleChange}
                autoComplete="new-password"
              />
              {errorMessage && (
                <div role="alert" className="alert alert-warning bg-red-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span className="text-sm font-semibold">{errorMessage}</span>
                </div>
              )}
              <div className="pt-3 text-center">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={formik.isSubmitting}
                >
                  <div className="flex items-center justify-center">
                    Salvar
                    <MdArrowForward className="ml-2 text-lg" />
                  </div>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Login };
