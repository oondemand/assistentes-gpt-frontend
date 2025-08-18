import { DefaultField } from "../../components/buildForm/filds/default";
import { z } from "zod";
import { TextareaField } from "../../components/buildForm/filds/textarea";
import { SelectAplicativoField } from "../../components/buildForm/filds/selectAplicativo";

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
          colSpan: 1,
        },
        {
          accessorKey: "descricao",
          label: "Descrição",
          render: DefaultField,
          validation: z.string().optional(),
          colSpan: 2,
        },
        {
          accessorKey: "aplicativo",
          label: "Aplicativo",
          render: SelectAplicativoField,
          validation: z.any(),
          colSpan: 1,
        },
      ],
    },
    {
      accessorKey: "mensagemInicial",
      label: "Mensagem inicial",
      render: DefaultField,
      validation: z.string().optional(),
      colSpan: 4,
    },
    {
      accessorKey: "instrucao",
      label: "Instrução",
      render: (props) => <TextareaField variant="outline" {...props} h="44" />,
      validation: z.string().optional(),
      colSpan: 4,
    },
  ];
};
