import React, { useMemo } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { DataGrid } from "../../components/dataGrid";
import { useDataGrid } from "../../hooks/useDataGrid";
import { makeAssistenteConfigDynamicColumns } from "./columns";
import { queryClient } from "../../config/react-query";
import { AssistenteConfigDialog } from "./dialog";
import { AssistantConfigService } from "../../service/assistant-config";
import { useUpdateAssistantConfig } from "../../hooks/api/assistant-config/useUpdateAssistantConfig";
import { ORIGENS } from "../../constants/origens";
import { useAuth } from "../../hooks/useAuth";
import { toaster } from "../../components/ui/toaster";

export const AssistentesDatagrid = () => {
  const { user } = useAuth();
  const columns = useMemo(() => makeAssistenteConfigDynamicColumns({}), []);

  const { filters, table } = useDataGrid({ columns, key: "ASSISTENTE_CONFIG" });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["listar-assistentes", { filters }],
    queryFn: async () =>
      await AssistantConfigService.listarAssistenteConfig({ filters }),
    placeholderData: keepPreviousData,
  });

  const updateAssistantConfig = useUpdateAssistantConfig({
    origem: ORIGENS.DATAGRID,
    onSuccess: () =>
      queryClient.invalidateQueries(["listar-assistente", { filters }]),
  });

  return (
    <Box>
      <Text fontSize="lg" color="gray.700" fontWeight="semibold">
        Assistentes
      </Text>
      <Box mt="4" bg="white" py="6" px="4" rounded="lg" shadow="xs">
        <DataGrid
          table={table}
          form={AssistenteConfigDialog}
          data={data?.results || []}
          rowCount={data?.pagination?.totalItems}
          isDataLoading={isLoading || isFetching}
          onUpdateData={async (values) => {
            if (user?.editarAssistente) {
              await updateAssistantConfig.mutateAsync({
                id: values.id,
                body: values.data,
              });
            }

            toaster.create({
              type: "error",
              description: "Você não tem permissão para editar esse campo.",
            });
          }}
        />
      </Box>
    </Box>
  );
};
