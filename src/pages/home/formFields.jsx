import z from "zod";
import { DefaultField } from "../../components/buildForm/fields/default";
import { AMBIENTES_MAP } from "../../constants/maps";
import { SelectField } from "../../components/buildForm/fields/selectField";
import { AppKeyGeneratorField } from "../../components/buildForm/fields/appKeyField";

export const createDynamicFormFields = () => {
  return [
    {
      accessorKey: "nome",
      label: "Nome",
      render: DefaultField,
      validation: z
        .string({ message: "Nome é um campo obrigatório" })
        .nonempty({ message: "Nome é um campo obrigatório" }),
    },
    {
      accessorKey: "icone",
      label: "Icone",
      render: DefaultField,
      validation: z.union([
        z.literal(""), // aceita string vazia
        z.string().url({ message: "Url inválida" }), // ou uma URL válida
      ]),
    },
    {
      accessorKey: "url",
      label: "Url",
      render: DefaultField,
      validation: z
        .string()
        .url({ message: "Url inválida" })
        .nonempty({ message: "Url é um campo obrigatório!" }),
    },
    {
      accessorKey: "appKey",
      label: "App key",
      render: AppKeyGeneratorField,
      validation: z.string().regex(/^oon_.{10}$/, {
        message: "A chave deve começar com prefixo 'oon_'",
      }),
    },
    {
      accessorKey: "tipoAcessoUrl",
      label: "Url tipo de acesso",
      render: DefaultField,
      validation: z.string().url().optional(),
    },
    {
      accessorKey: "ambiente",
      label: "Ambiente",
      render: SelectField,
      options: Object.entries(AMBIENTES_MAP).map(([key, value]) => ({
        label: value.label,
        value: key,
      })),
      validation: z.enum(Object.entries(AMBIENTES_MAP).map(([key, _]) => key)),
    },
  ];
};
