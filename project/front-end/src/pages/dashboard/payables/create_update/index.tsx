import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { payableService } from "@/services/payable";
import { assignorService } from "@/services/assignor";
import { Button } from "@/components/button";
import { MdArrowForward } from "react-icons/md";
import { Input } from "@/components/form/input";
import { Select } from "@/components/form/select";
import { getErrorMessage } from "@/util/erros";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/dashboard";
import { Content } from "@/components/content";
import { Header } from "@/components/header";

const PayableCreateOrUpdate: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [errorMessage, setErrorMessage] = useState("");
  const [assignors, setAssignors] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadAssignors();
    if (id) {
      setIsEditing(true);
      loadPayable(id);
    }
  }, [id]);

  const loadAssignors = async () => {
    try {
      const result = await assignorService.getAssignors(1, 999, "");
      setAssignors(result.data || []);
    } catch (error: any) {
      setErrorMessage(getErrorMessage(error.statusCode));
    }
  };

  const loadPayable = async (payableId: string) => {
    setErrorMessage("");
    try {
      const payable = await payableService.getPayableById(payableId);
      formik.setValues({
        assignorId: payable.assignorId || "",
        value: payable.value || "",
        emissionDate: payable.emissionDate
          ? new Date(payable.emissionDate).toISOString().split("T")[0]
          : "",
      });
    } catch (error: any) {
      setErrorMessage(getErrorMessage(error.statusCode));
    }
  };

  const onSubmit = async () => {
    setErrorMessage("");
    try {
      if (isEditing) {
        await payableService.updatePayable(
          id!,
          parseFloat(formik.values?.value),
          formik.values?.emissionDate
        );
      } else {
        await payableService.createPayable(
          formik.values?.assignorId,
          parseFloat(formik.values?.value),
          formik.values?.emissionDate
        );
      }

      navigate("/dashboard/payables", { replace: true });
    } catch (error: any) {
      setErrorMessage(getErrorMessage(error.statusCode));
    }
  };

  const validationSchema = Yup.object({
    assignorId: Yup.string()
      .required("Selecione o cedente associado ao título.")
      .uuid("ID do cedente inválido."),
    value: Yup.number()
      .required("Digite o valor do título.")
      .positive("O valor deve ser maior que zero."),
    emissionDate: Yup.string()
      .required("Digite a data de emissão do título.")
      .matches(
        /^\d{4}-\d{2}-\d{2}$/,
        "A data deve estar no formato YYYY-MM-DD."
      ),
  });

  const formik = useFormik({
    initialValues: {
      assignorId: "",
      value: "",
      emissionDate: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <DashboardLayout>
      <Content className="min-h-[calc(100vh_-_80px)]">
        <Header title="Títulos a Pagar:" goBack="/dashboard/payables" />

        <div className="py-8">
          <div className="w-full">
            <h2 className="mb-3 text-center text-2xl font-bold text-gray-700">
              {isEditing ? "Editar Título" : "Cadastro de Título"}
            </h2>
            <p className="text-center text-sm text-gray-500">
              Preencha as informações abaixo para{" "}
              {isEditing ? "editar" : "cadastrar"} o título.
            </p>
            <div className="py-8">
              <form onSubmit={formik.handleSubmit}>
                <Select
                  id="assignorId"
                  name="assignorId"
                  label="Cedente:"
                  options={assignors.map(assignor => ({
                    value: assignor.id,
                    label: assignor.name,
                  }))}
                  error={formik?.errors?.assignorId}
                  value={formik?.values?.assignorId || ""}
                  onChange={e =>
                    formik.setFieldValue("assignorId", e.target.value)
                  }
                />
                <Input
                  id="value"
                  name="value"
                  label="Valor:"
                  placeholder="Digite o valor do título"
                  type="number"
                  error={formik?.errors?.value}
                  value={formik?.values?.value || ""}
                  onChange={formik?.handleChange}
                  autoComplete="off"
                />
                <Input
                  id="emissionDate"
                  name="emissionDate"
                  label="Data de Emissão:"
                  placeholder="Digite a data no formato YYYY-MM-DD"
                  type="date"
                  error={formik?.errors?.emissionDate}
                  value={formik?.values?.emissionDate || ""}
                  onChange={formik?.handleChange}
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

export { PayableCreateOrUpdate };
