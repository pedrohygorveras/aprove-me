import { documentMask, phoneMask } from "@/components/form/input-masked/masks";

export const fields = [
  {
    name: "name",
    label: "Nome:",
    placeholder: "Digite um nome",
    type: "text" as const,
  },
  {
    name: "email",
    label: "Email:",
    placeholder: "Digite um e-mail",
    type: "email" as const,
  },
  {
    name: "phone",
    label: "Telefone:",
    placeholder: "(99) 99999-9999",
    type: "masked" as const,
    mask: phoneMask,
  },
  {
    name: "document",
    label: "Documento:",
    placeholder: "999.999.999-99",
    type: "masked" as const,
    mask: documentMask,
  },
];
