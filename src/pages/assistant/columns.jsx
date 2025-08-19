import { SelectAutoCompleteCell } from "../../components/dataGrid/cells/selectAutoComplete";

import { DefaultEditableCell } from "../../components/dataGrid/cells/defaultEditable";
import { AssistenteConfigDialog } from "./dialog";
import { TableActionsCell } from "../../components/dataGrid/cells/tableActionsCell";
import { DeleteAssistenteConfigAction } from "../../components/dataGrid/actions/deleteAssistenteConfigButton";
import { SelectAplicativoCell } from "../../components/dataGrid/cells/selectAplicativoCell";

export const makeAssistenteConfigDynamicColumns = () => {
  const STATUS = [
    { label: "Ativo", value: "ativo" },
    { label: "Inativo", value: "inativo" },
  ];

  return [
    {
      accessorKey: "acoes",
      header: "Ações",
      enableSorting: false,
      cell: (props) => (
        <TableActionsCell>
          <DeleteAssistenteConfigAction id={props.row.original?._id} />
          <AssistenteConfigDialog
            label="Assistente"
            defaultValues={props.row.original}
          />
        </TableActionsCell>
      ),
    },
    {
      accessorKey: "nome",
      header: "Nome",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "nome" },
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "descricao" },
    },
    {
      accessorKey: "aplicativo",
      header: "Aplicativo",
      cell: SelectAplicativoCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "aplicativo", filterVariant: "selectAplicativo" },
    },
    {
      accessorKey: "instrucao",
      header: "Instrução",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "instrucao" },
    },
    {
      accessorKey: "mensagemInicial",
      header: "Mensagem inicial",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "mensagemInicial" },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (props) => <SelectAutoCompleteCell {...props} options={STATUS} />,
      enableColumnFilter: true,
      enableSorting: false,
      meta: {
        filterKey: "status",
        filterVariant: "select",
        filterOptions: STATUS,
      },
    },
  ];
};
