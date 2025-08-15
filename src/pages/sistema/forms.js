import { DefaultField } from "../../components/buildForm/filds/default";
import { z } from "zod";

export const FORMS = [
  {
    title: "Geral",
    fields: [
      {
        accessorKey: "appKey",
        label: "App key",
        render: DefaultField,
        validation: z.string().nonempty(),
        colSpan: 1,
      },
    ],
  },
];
