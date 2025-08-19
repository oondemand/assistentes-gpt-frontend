import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AplicativoService } from "../../../service/aplicativo";
import { SelectAutocomplete } from "../../selectAutocomplete";
import { useConfirmation } from "../../../hooks/useConfirmation";

export const SelectAplicativoCell = ({
  getValue,
  row,
  column,
  table,
  cod,
  ...rest
}) => {
  const { data } = useQuery({
    queryKey: ["listar-aplicativos"],
    queryFn: () => AplicativoService.listarAplicativos(),
    staleTime: 1000 * 60 * 10, // 10 minutos em milissegundos
  });

  const initialValue = getValue();
  const [value, setValue] = useState("");
  const { requestConfirmation } = useConfirmation();

  const options =
    data?.aplicativos?.map((item) => ({
      label: item?.nome,
      value: item?._id,
    })) || [];

  const findItemByInitialValue = (options) => {
    return options.find((option) => {
      return option.value === initialValue;
    });
  };

  const handleUpdateError = () => {
    const fallbackValue = options.find(
      (item) => item.chave === initialValue || item.valor === initialValue
    );
    setValue(fallbackValue);
  };

  const handleBlur = async () => {
    const originalItem = findItemByInitialValue(options);
    if (!value || value?.value === (originalItem?.value || originalItem?.label))
      return;

    if (column.columnDef?.confirmAction) {
      const { action } = await requestConfirmation({
        title: column.columnDef?.confirmAction?.title,
        description: column.columnDef?.confirmAction?.description,
      });

      if (action === "canceled") {
        return initialValue(initialValue);
      }
    }

    try {
      await table.options.meta?.updateData({
        id: row.original._id,
        data: { [column.columnDef.accessorKey]: value.value },
      });
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      handleUpdateError();
    }
  };

  const initializeValue = () => {
    const initialOption = findItemByInitialValue(options);
    setValue(initialOption);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      initializeValue();
    }
  };

  useEffect(() => {
    initializeValue();
  }, [initialValue, data]);
  return (
    <SelectAutocomplete
      onKeyDown={handleKeyDown}
      placeholder={value}
      onBlur={handleBlur}
      value={value}
      setValue={setValue}
      options={options}
    />
  );
};
