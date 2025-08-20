import { Box, Text, Flex, IconButton } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RotateCw } from "lucide-react";
import { Tooltip } from "../../components/ui/tooltip";
import { toaster } from "../../components/ui/toaster";
import { ListaOmieService } from "../../service/lista-omie";
import { ORIGENS } from "../../constants/origens";
import { formatDate } from "../../utils/formatting";

export const ListaOmieComponent = () => {
  const { data } = useQuery({
    queryKey: ["listas-omie"],
    queryFn: ListaOmieService.getListas,
  });

  const { mutateAsync: onSyncOmieLista, isPending } = useMutation({
    mutationFn: async ({ id }) =>
      ListaOmieService.update({ id, origem: ORIGENS.FORM }),
    onSuccess: () => {
      toaster.create({
        title: "Lista sincronizada com sucesso!",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro inesperado ao sincronizar lista.",
        description: error?.response?.data?.message,
        type: "error",
      });
    },
  });

  return (
    <Box p="4">
      {data?.listas?.map((item) => {
        console.log("DATA", item);

        return (
          <Flex
            key={item._id}
            justifyContent="space-between"
            alignItems="center"
            mb="2.5"
            gap="6"
          >
            <Text fontSize="sm" color="gray.600">
              {item?.call} - {item?.url} -{" "}
              {formatDate(item?.updatedAt, "dd/MM/yyyy HH:MM")} -{" "}
              {item?.data?.length} items
            </Text>

            <Tooltip
              content="Sincronizar lista com omie"
              openDelay={500}
              closeDelay={50}
            >
              <IconButton
                disabled={isPending}
                onClick={async () => {
                  await onSyncOmieLista({
                    id: item._id,
                  });
                }}
                variant="subtle"
                size="2xs"
              >
                <RotateCw />
              </IconButton>
            </Tooltip>
          </Flex>
        );
      })}
    </Box>
  );
};
