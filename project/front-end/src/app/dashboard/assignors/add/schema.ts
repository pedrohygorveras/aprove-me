import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Nome muito curto, deve ter pelo menos 3 caracteres")
    .max(140, "Nome muito longo, máximo de 140 caracteres"),

  email: yup
    .string()
    .email("Email inválido")
    .required("Email é obrigatório")
    .min(5, "Email muito curto, deve ter pelo menos 5 caracteres")
    .max(140, "Email muito longo, máximo de 140 caracteres"),

  phone: yup
    .string()
    .required("Telefone é obrigatório")
    .min(14, "Telefone muito curto, use o formato (99) 99999-9999")
    .max(20, "Telefone muito longo, máximo de 20 caracteres"),

  document: yup
    .string()
    .required("Documento é obrigatório")
    .min(14, "Documento muito curto, mínimo de 14 caracteres")
    .max(30, "Documento muito longo, máximo de 30 caracteres"),
});
