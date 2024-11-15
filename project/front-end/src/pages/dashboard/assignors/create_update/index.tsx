import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { assignorService } from "@/services/assignor";
import { Button } from "@/components/button";
import { MdArrowForward } from "react-icons/md";
import { Input } from "@/components/form/input";
import { getErrorMessage } from "@/util/erros";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/dashboard";
import { Content } from "@/components/content";
import { Header } from "@/components/header";

const AssignorCreateOrUpdate: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      loadAssignor(id);
    }
  }, [id]);

  const loadAssignor = async (assignorId: string) => {
    setErrorMessage("");
    try {
      const assignor = await assignorService.getAssignorById(assignorId);
      formik.setValues({
        name: assignor.name || "",
        email: assignor.email || "",
        phone: assignor.phone || "",
        document: assignor.document || "",
      });
    } catch (error: any) {
      setErrorMessage(getErrorMessage(error.statusCode));
    }
  };

  const onSubmit = async () => {
    setErrorMessage("");
    try {
      if (isEditing) {
        await assignorService.updateAssignor(
          id!,
          formik.values?.name,
          formik.values?.email,
          formik.values?.phone,
          formik.values?.document
        );
      } else {
        await assignorService.createAssignor(
          formik.values?.name,
          formik.values?.email,
          formik.values?.phone,
          formik.values?.document
        );
      }

      navigate("/dashboard/assignors", { replace: true });
    } catch (error: any) {
      setErrorMessage(getErrorMessage(error.statusCode));
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Digite o nome do cedente.")
      .max(255, "O nome pode ter no máximo 255 caracteres."),
    email: Yup.string()
      .required("Digite o email do cedente.")
      .email("Digite um email válido."),
    phone: Yup.string()
      .required("Digite o telefone do cedente.")
      .matches(
        /^\d{10,11}$/,
        "Digite um telefone válido com 10 ou 11 dígitos."
      ),
    document: Yup.string()
      .required("Digite o documento do cedente.")
      .matches(/^\d{11}$/, "O documento deve conter 11 dígitos."),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      document: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <DashboardLayout>
      <Content className="min-h-[calc(100vh_-_80px)]">
        <Header title="Cedentes:" goBack="/dashboard/assignor" />

        <div className="py-8">
          <div className="w-full">
            <h2 className="mb-3 text-center text-2xl font-bold text-gray-700">
              {isEditing ? "Editar Cedente" : "Cadastro de Cedente"}
            </h2>
            <p className="text-center text-sm text-gray-500">
              Preencha as informações abaixo para{" "}
              {isEditing ? "editar" : "cadastrar"} o cedente.
            </p>
            <div className="py-8">
              <form onSubmit={formik.handleSubmit}>
                <Input
                  id="name"
                  name="name"
                  label="Nome:"
                  placeholder="Digite o nome do cedente"
                  type="text"
                  error={formik?.errors?.name}
                  value={formik?.values?.name || ""}
                  onChange={formik?.handleChange}
                  autoComplete="off"
                />
                <Input
                  id="email"
                  name="email"
                  label="Email:"
                  placeholder="Digite o email do cedente"
                  type="email"
                  error={formik?.errors?.email}
                  value={formik?.values?.email || ""}
                  onChange={formik?.handleChange}
                  autoComplete="off"
                />
                <Input
                  id="phone"
                  name="phone"
                  label="Telefone:"
                  placeholder="Digite o telefone com 10 ou 11 dígitos"
                  type="text"
                  error={formik?.errors?.phone}
                  value={formik?.values?.phone || ""}
                  onChange={e => {
                    const onlyNumbers = e.target.value.replace(/\D/g, "");
                    formik.setFieldValue("phone", onlyNumbers);
                  }}
                  autoComplete="off"
                />
                <Input
                  id="document"
                  name="document"
                  label="Documento:"
                  placeholder="Digite o CPF do cedente (11 dígitos)"
                  type="text"
                  error={formik?.errors?.document}
                  value={formik?.values?.document || ""}
                  onChange={e => {
                    const onlyNumbers = e.target.value.replace(/\D/g, "");
                    formik.setFieldValue("document", onlyNumbers);
                  }}
                  autoComplete="off"
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
                    <span className="text-sm font-semibold">
                      {errorMessage}
                    </span>
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
      </Content>
    </DashboardLayout>
  );
};

export { AssignorCreateOrUpdate };
