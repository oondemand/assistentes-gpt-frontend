import { createListCollection } from "@chakra-ui/react";

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";

import { useQuery } from "@tanstack/react-query";
import { AplicativoService } from "../../service/aplicativo";

import { Box } from "@chakra-ui/react";

export function SelectAplicativo({ label, ...props }) {
  const { data, error } = useQuery({
    queryKey: ["list-aplicativos"],
    queryFn: AplicativoService.listarAplicativos,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const aplicativosCollection = createListCollection({
    items: [
      ...(data?.aplicativos?.map((e) => {
        return { label: e.nome, value: e._id };
      }) ?? []),

      { label: "Todos", value: "" },
    ],
  });

  return (
    <Box>
      <SelectRoot
        rounded="md"
        size="xs"
        collection={aplicativosCollection}
        {...props}
      >
        {label && (
          <SelectLabel
            fontSize="xs"
            mb="-1"
            fontWeight="normal"
            color="gray.500"
          >
            {label}
          </SelectLabel>
        )}
        <SelectTrigger>
          <SelectValueText placeholder="Selecione um assistente" />
        </SelectTrigger>
        <SelectContent zIndex={9999}>
          {aplicativosCollection?.items?.map((aplicativo) => (
            <SelectItem
              cursor="pointer"
              rounded="sm"
              _hover={{ bg: "gray.100" }}
              item={aplicativo}
              key={aplicativo.value}
            >
              {aplicativo.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Box>
  );
}
