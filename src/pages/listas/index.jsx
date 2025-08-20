import {
  Flex,
  Tabs,
  Box,
  Button,
  Input,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useStateWithStorage } from "../../hooks/useStateStorage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ListaService } from "../../service/listas";
import { Trash2 } from "lucide-react";
import { toaster } from "../../components/ui/toaster";
import { api } from "../../config/api";
import { queryClient } from "../../config/react-query";

import { useConfirmation } from "../../hooks/useConfirmation";
import { ListaOmieComponent } from "./listaOmie";
import { ORIGENS } from "../../constants/origens";

export function Listas() {
  const [tab, setTab] = useStateWithStorage("LISTAS-TAB");
  const { requestConfirmation } = useConfirmation();

  const { data } = useQuery({
    queryKey: ["listas"],
    queryFn: ListaService.getListas,
    staleTime: 1000 * 60 * 10, // 10 min
  });

  const { data: codigos } = useQuery({
    queryKey: ["listas-codigo"],
    queryFn: ListaService.getCodigos,
    staleTime: 1000 * 60 * 10, // 10 min
  });

  const { mutateAsync: onAddItemMutation } = useMutation({
    mutationFn: async ({ codigo, values }) =>
      await api.post(`listas/${codigo}`, values, {
        headers: {
          "x-origem": ORIGENS.FORM,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["listas"]);
      toaster.create({
        title: "Item adicionado com sucesso!",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Ouve um erro inesperado ao adicionar novo item a lista.",
        type: "error",
      });
    },
  });

  const { mutateAsync: onDeleteItemMutation } = useMutation({
    mutationFn: async ({ codigo, itemId }) =>
      await api.delete(`listas/${codigo}/${itemId}`, {
        headers: {
          "x-origem": ORIGENS.FORM,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["listas"]);
      toaster.create({
        title: "Item excluído com sucesso!",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Ouve um erro inesperado ao excluir item.",
        type: "error",
      });
    },
  });

  const { mutateAsync: onUpdateItemMutation } = useMutation({
    mutationFn: async ({ codigo, itemId, key, value }) =>
      await api.put(
        `listas/${codigo}`,
        {
          itemId,
          [key]: value,
        },
        {
          headers: {
            "x-origem": ORIGENS.FORM,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["listas"]);
      toaster.create({
        title: "Item atualizado com sucesso!",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro inesperado ao atualizar item.",
        description: error?.response?.data?.message ?? error?.message,
        type: "error",
      });
    },
  });

  const handleDeleteLista = async ({ codigo, itemId }) => {
    const { action } = await requestConfirmation({
      title: "Tem certeza que deseja remover item ?",
      description: "Essa operação não pode ser desfeita!",
    });

    if (action === "confirmed") {
      await onDeleteItemMutation({ codigo, itemId });
    }
  };

  return (
    <>
      <Text fontSize="lg" color="gray.700" fontWeight="semibold">
        Listas
      </Text>
      <Flex mt="4" gap="4">
        <Tabs.Root
          value={tab}
          onValueChange={(e) => setTab(e.value)}
          variant="line"
          bg="white"
          rounded="lg"
          shadow="sm"
        >
          <Tabs.List>
            {codigos &&
              codigos?.length > 0 &&
              codigos.map((codigo) => (
                <Tabs.Trigger color="gray.500" value={codigo} key={codigo}>
                  {codigo.charAt(0).toUpperCase() +
                    codigo.slice(1).replace(/[-_]/g, " ")}
                </Tabs.Trigger>
              ))}

            {/* <Tabs.Trigger color="gray.500" value="omie">
              Omie
            </Tabs.Trigger> */}
          </Tabs.List>
          {codigos &&
            codigos?.length > 0 &&
            codigos?.map((codigo) => (
              <Tabs.Content key={codigo} value={codigo} p="0">
                <Box
                  px="6"
                  py="4"
                  pb="8"
                  maxH="600px"
                  overflow="auto"
                  className="custom-scrollbar"
                >
                  <Flex alignItems="center" gap="4">
                    <Text fontSize="sm" fontWeight="medium" color="gray.700">
                      {codigo.charAt(0).toUpperCase() +
                        codigo.slice(1).replace(/[-_]/g, " ")}
                    </Text>
                    <Button
                      onClick={() => {
                        onAddItemMutation({ codigo, values: {} });
                      }}
                      variant="subtle"
                      color="brand.500"
                      size="2xs"
                    >
                      Adicionar item
                    </Button>
                  </Flex>

                  {data &&
                    data?.listas
                      .find((e) => e?.codigo === codigo)
                      ?.data?.map((item) => (
                        <Flex alignItems="center" gap="4" mt="2">
                          <Input
                            w="sm"
                            size="sm"
                            name="valor"
                            color="gray.600"
                            placeholder="Preencha o valor do item..."
                            variant="flushed"
                            fontSize="xs"
                            defaultValue={item?.valor}
                            key={item?._id}
                            onBlur={async (ev) => {
                              if (
                                ev.target.value !== "" &&
                                ev.target.defaultValue !== ev.target.value
                              ) {
                                await onUpdateItemMutation({
                                  itemId: item._id,
                                  key: ev.target.name,
                                  value: ev.target.value,
                                  codigo,
                                });
                              }
                            }}
                          />
                          <IconButton
                            onClick={async () => {
                              await handleDeleteLista({
                                itemId: item._id,
                                codigo,
                              });
                            }}
                            variant="subtle"
                            colorPalette="red"
                            size="2xs"
                          >
                            <Trash2 />
                          </IconButton>
                        </Flex>
                      ))}
                </Box>
              </Tabs.Content>
            ))}

          {/* <Tabs.Content value="omie" p="0">
            <ListaOmieComponent />
          </Tabs.Content> */}
        </Tabs.Root>
      </Flex>
    </>
  );
}
