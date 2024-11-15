import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { userService } from "@/services/user";
import { Button } from "@/components/button";
import { MdArrowForward } from "react-icons/md";
import { Input } from "@/components/form/input";
import { Select } from "@/components/form/select";
import { getErrorMessage } from "@/util/erros";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/dashboard";
import { Content } from "@/components/content";
import { Header } from "@/components/header";

export enum UserRole {
  Admin = "Admin",
  Operator = "Operator",
  Auditor = "Auditor",
  Manager = "Manager",
  Support = "Support",
}

const UserCreateOrUpdate: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      loadUser(id);
    }
  }, [id]);

  const loadUser = async (userId: string) => {
    setErrorMessage("");
    try {
      const user = await userService.getUserById(userId);
      formik.setValues({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        password: "",
        role: user.role || "",
      });
    } catch (error: any) {
      setErrorMessage(getErrorMessage(error.statusCode));
    }
  };

  const onSubmit = async (values: any) => {
    setErrorMessage("");
    try {
      if (isEditing) {
        await userService.updateUser(
          id!,
          values.name,
          values.username,
          values.email,
          values.role
        );
      } else {
        await userService.createUser(
          values.name,
          values.username,
          values.password,
          values.email,
          values.role
        );
      }

      navigate("/dashboard/users", { replace: true });
    } catch (error: any) {
      setErrorMessage(getErrorMessage(error.statusCode));
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Digite o nome do usuário.")
      .max(255, "O nome pode ter no máximo 255 caracteres."),
    username: Yup.string()
      .required("Digite o nome de usuário.")
      .max(255, "O nome de usuário pode ter no máximo 255 caracteres."),
    email: Yup.string()
      .required("Digite o email do usuário.")
      .email("Digite um email válido."),
    password: Yup.string().when([], {
      is: () => !id,
      then: schema =>
        schema
          .required("Digite a senha do usuário.")
          .min(6, "A senha deve ter pelo menos 6 caracteres."),
      otherwise: schema => schema.notRequired(),
    }),
    role: Yup.string()
      .required("Selecione o papel do usuário.")
      .oneOf(Object.values(UserRole), "Papel inválido."),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      role: "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit,
  });

  return (
    <DashboardLayout>
      <Content className="min-h-[calc(100vh_-_80px)]">
        <Header title="Usuários:" goBack="/dashboard/users" />

        <div className="py-8">
          <div className="w-full">
            <h2 className="mb-3 text-center text-2xl font-bold text-gray-700">
              {isEditing ? "Editar Usuário" : "Cadastro de Usuário"}
            </h2>
            <p className="text-center text-sm text-gray-500">
              Preencha as informações abaixo para{" "}
              {isEditing ? "editar" : "cadastrar"} o usuário.
            </p>
            <div className="py-8">
              <form onSubmit={formik.handleSubmit}>
                <Input
                  id="name"
                  name="name"
                  label="Nome:"
                  placeholder="Digite o nome do usuário"
                  type="text"
                  error={formik.errors.name}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  autoComplete="new-name"
                />
                <Input
                  id="username"
                  name="username"
                  label="Nome de Usuário:"
                  placeholder="Apelido para acessar a plataforma."
                  type="text"
                  error={formik.errors.username}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  autoComplete="new-username"
                />
                <Input
                  id="email"
                  name="email"
                  label="Email:"
                  placeholder="Digite o email do usuário"
                  type="email"
                  error={formik.errors.email}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  autoComplete="new-email"
                />
                {!isEditing && (
                  <Input
                    id="password"
                    name="password"
                    label="Senha:"
                    placeholder="Digite a senha do usuário"
                    type="password"
                    error={formik.errors.password}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    autoComplete="new-password"
                  />
                )}
                <Select
                  id="role"
                  name="role"
                  label="Papel:"
                  options={Object.entries(UserRole).map(([key, value]) => ({
                    value,
                    label: key,
                  }))}
                  error={formik.errors.role}
                  value={formik.values.role}
                  onChange={e => formik.setFieldValue("role", e.target.value)}
                />
                {errorMessage && (
                  <div role="alert" className="alert alert-warning bg-red-100">
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

export { UserCreateOrUpdate };
