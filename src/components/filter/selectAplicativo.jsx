import { NativeSelectField, NativeSelectRoot } from "../ui/native-select";
import { useQuery } from "@tanstack/react-query";
import { AplicativoService } from "../../service/aplicativo";

export function SelectAplicativoFilter({ onChange, value, ...props }) {
  const { data } = useQuery({
    queryFn: async () => await AplicativoService.listarAplicativos(),
    queryKey: ["listar-aplicativos"],
    staleTime: 1000 * 60 * 10, //10 minutos
  });

  const options = data?.aplicativos?.map((e) => ({
    label: e?.nome,
    value: e?._id,
  }));

  return (
    <NativeSelectRoot>
      <NativeSelectField
        size="xs"
        h="28px"
        rounded="sm"
        color="gray.700"
        bg="white"
        value={value}
        onChange={onChange}
        {...props}
      >
        {options?.map((item, i) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
        <option value="">Todos</option>
      </NativeSelectField>
    </NativeSelectRoot>
  );
}
