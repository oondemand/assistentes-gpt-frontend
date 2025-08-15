import { DefaultField } from "../../components/buildForm/filds/default";
import { z } from "zod";
import { SelectAssistantField } from "../../components/buildForm/filds/selectAssistantField";
import { TextareaField } from "../../components/buildForm/filds/textarea";

export const createDynamicFormFields = () => {
  return [
    {
      label: "Detalhes do assistente",
      group: [
        {
          accessorKey: "nome",
          label: "Nome",
          render: DefaultField,
          validation: z.coerce
            .string()
            .min(3, { message: "Modulo precisa ter pelo menos 3 caracteres" }),
          colSpan: 2,
        },
        {
          accessorKey: "descricao",
          label: "Descrição",
          render: DefaultField,
          validation: z.string().optional(),
          colSpan: 2,
        },
      ],
    },
    {
      group: [
        {
          accessorKey: "instrucao",
          label: "Instrução",
          render: TextareaField,
          validation: z.string().optional(),
          colSpan: 4,
        },
        {
          accessorKey: "mensagemInicial",
          label: "Mensagem inicial",
          render: TextareaField,
          validation: z.string().optional(),
          colSpan: 4,
        },
      ],
    },
  ];
};
