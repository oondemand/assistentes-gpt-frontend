import { DefaultField } from "../../components/buildForm/filds/default";
import { z } from "zod";
import { TextareaField } from "../../components/buildForm/filds/textarea";
import { SelectAplicativoField } from "../../components/buildForm/filds/selectAplicativo";
import { SelectListaField } from "../../components/buildForm/filds/selectListaField";

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
          validation: z
            .string({ message: "Aplicativo é um campo obrigatório!" })
            .nonempty({ message: "Aplicativo é um campo obrigatório!" }),
          colSpan: 1,
        },
      ],
    },
    {
      accessorKey: "mensagemInicial",
      label: "Mensagem inicial",
      render: DefaultField,
      validation: z.string().optional(),
      colSpan: 3,
    },
    {
      accessorKey: "modelo",
      label: "Modelo",
      render: SelectListaField,
      cod: "modelo-open-ia",
      validation: z
        .string({ message: "Modelo é um campo obrigatório!" })
        .nonempty({ message: "Modelo é um campo obrigatório!" }),
      colSpan: 1,
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
