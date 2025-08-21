import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { keepPreviousData, useQueries, useQuery } from "@tanstack/react-query";

import { Filter, Settings, Table } from "lucide-react";
import { AssistantConfigService } from "../../service/assistant-config";
import { DebouncedInput } from "../../components/DebouncedInput";
import { useQueryParam } from "../../hooks/useQueryParam";
import { Link } from "react-router-dom";
import { Tooltip } from "../../components/ui/tooltip";
import { AssistenteConfigDialog } from "./dialog";
import { DefaultTrigger } from "../../components/formDialog/form-trigger";
import { SelectAplicativo } from "../../components/selectAplicativo";
import { AplicativoService } from "../../service/aplicativo";
import { useAuth } from "../../hooks/useAuth";

function agruparPorAplicativos({ assistentes, aplicativos }) {
  if (!aplicativos || !assistentes) return [];
  const map = new Map(
    aplicativos.map((aplicativo) => [
      aplicativo._id,
      { nome: aplicativo.nome, _id: aplicativo._id, assistentes: [] },
    ])
  );

  for (const assistente of assistentes) {
    const v = map.get(assistente.aplicativo);
    map.set(assistente.aplicativo, {
      ...v,
      assistentes: [...v.assistentes, assistente],
    });
  }

  return Array.from(map.values());
}

export const Assistentes = () => {
  const [searchTerm, setSearchTerm] = useQueryParam("searchTerm");
  const [app, setApp] = useQueryParam("app");
  const { user } = useAuth();

  const [assistentesQuery, aplicativosQuery] = useQueries({
    queries: [
      {
        queryKey: ["assistentes-ativos"],
        queryFn: AssistantConfigService.listarAssistenteAtivos,
        staleTime: 1000 * 60, // 1 minuto
        placeholderData: keepPreviousData,
      },
      {
        queryKey: ["listar-aplicativos"],
        queryFn: AplicativoService.listarAplicativos,
        staleTime: 1000 * 60 * 10, // 10 minutos
      },
    ],
  });

  const assistentes = assistentesQuery?.data?.assistentes;
  const aplicativos = aplicativosQuery?.data?.aplicativos;

  const assistentesPorTermoDeBusca =
    searchTerm?.toLowerCase()?.trim()?.length > 2
      ? assistentes?.filter((assistente) => {
          const term = searchTerm?.toLowerCase()?.trim();
          return (
            assistente?.nome?.toLowerCase()?.includes(term) ||
            assistente?._id === searchTerm
          );
        })
      : assistentes;

  const assistentesPorApp = app
    ? assistentesPorTermoDeBusca?.filter((ass) => ass?.aplicativo === app)
    : assistentesPorTermoDeBusca;

  const assistentesFiltradosEAgrupados = agruparPorAplicativos({
    aplicativos:
      app !== "" ? aplicativos?.filter((e) => e?._id === app) : aplicativos,
    assistentes: assistentesPorApp,
  });

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="flex-start">
        <Flex alignItems="center" gap="4">
          <Text fontSize="lg" color="gray.700" fontWeight="semibold">
            Assistentes
          </Text>
          {user?.editarAssistente && (
            <Tooltip content="Visualizar todos em tabela">
              <Link to="/assistentes/todos">
                <Button
                  colorPalette="cyan"
                  p="1.5"
                  rounded="2xl"
                  cursor="pointer"
                  size="sm"
                >
                  <Table />
                </Button>
              </Link>
            </Tooltip>
          )}
        </Flex>
        <Flex gap="4">
          <Flex alignItems="center" color="gray.400" gap="3">
            <Tooltip content="Limpar filtros">
              <Button
                unstyled
                cursor="pointer"
                onClick={() => {
                  setSearchTerm("");
                  setApp("");
                }}
              >
                <Filter size={22} />
              </Button>
            </Tooltip>

            <SelectAplicativo
              value={[app]}
              onValueChange={({ value }) => setApp(value[0])}
              bg="white"
              size="sm"
              minW="2xs"
            />

            <DebouncedInput
              size="sm"
              w="xs"
              bg="white"
              placeholder="Pesquisar assistente..."
              rounded="sm"
              _placeholder={{ color: "gray.400" }}
              placeIcon="right"
              iconSize={16}
              value={searchTerm}
              onChange={setSearchTerm}
            />

            {user?.editarAssistente && (
              <AssistenteConfigDialog
                trigger={() => {
                  return (
                    <DefaultTrigger
                      variant="solid"
                      title="Novo assistente"
                      colorPalette="cyan"
                      color="white"
                      _hover={{ bg: "cyan.550" }}
                    />
                  );
                }}
              />
            )}
          </Flex>
        </Flex>
      </Flex>
      <Box wrap="wrap" gap="8" mt="8">
        {assistentesFiltradosEAgrupados.map((item) => {
          return (
            <Box key={item?._id} p="2">
              <Flex justifyContent="space-between" mb="4">
                <Box px="2" py="1" rounded="md">
                  <Text color="brand.600" fontSize="sm">
                    {item?.nome}
                  </Text>
                </Box>
              </Flex>
              <Flex px="2" gap="4">
                {item?.assistentes?.map((item) => (
                  <AssistenteConfigDialog
                    defaultValues={item}
                    trigger={() => {
                      return (
                        <Box
                          cursor="pointer"
                          bg="white"
                          rounded="lg"
                          px="4"
                          py="2"
                          borderLeft="2px solid"
                          borderColor="brand.300"
                          minH="72px"
                          w="256px"
                          shadow="xs"
                        >
                          <Text fontSize="sm">{item?.nome}</Text>
                          <Text lineClamp={2} fontSize="xs" mt="2">
                            {item?.descricao}
                          </Text>
                        </Box>
                      );
                    }}
                  />
                ))}
              </Flex>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
