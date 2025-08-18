import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { Filter, Settings, Table } from "lucide-react";
import { AssistantConfigService } from "../../service/assistant-config";
import { DebouncedInput } from "../../components/DebouncedInput";
import { useQueryParam } from "../../hooks/useQueryParam";
import { Link } from "react-router-dom";
import { Tooltip } from "../../components/ui/tooltip";
import { AssistenteConfigDialog } from "./dialog";
import { DefaultTrigger } from "../../components/formDialog/form-trigger";
import { SelectAplicativo } from "../../components/selectAplicativo";

function agruparPorAppId(assistentes) {
  if (!assistentes || assistentes.length === 0) return [];
  return assistentes.reduce((grupo, assistente) => {
    const appId = assistente.aplicativo?._id;
    const appNome = assistente.aplicativo?.nome;

    if (!grupo[appId]) {
      grupo[appId] = {
        nome: appNome,
        assistentes: [],
      };
    }

    grupo[appId].assistentes.push(assistente);
    return grupo;
  }, {});
}

export const Assistentes = () => {
  const [searchTerm, setSearchTerm] = useQueryParam("searchTerm");
  const [app, setApp] = useQueryParam("app");

  const { data } = useQuery({
    queryFn: AssistantConfigService.listarAssistenteAtivos,
    queryKey: ["assistentes-ativos"],
    staleTime: 1000 * 60, //1m
    placeholderData: keepPreviousData,
  });

  const assistentesFiltradosPorTermoDeBusca =
    searchTerm?.toLowerCase()?.trim()?.length > 2
      ? data?.assistentes?.filter((assistente) => {
          const term = searchTerm?.toLowerCase()?.trim();
          return (
            assistente?.nome?.toLowerCase()?.includes(term) ||
            assistente?._id === searchTerm ||
            assistente?.aplicativo?._id === searchTerm ||
            assistente?.aplicativo?.appKey === searchTerm
          );
        })
      : data?.assistentes;

  const filtradosPorApp = app
    ? assistentesFiltradosPorTermoDeBusca?.filter(
        (assistente) => assistente?.aplicativo?._id === app
      )
    : assistentesFiltradosPorTermoDeBusca;

  const assistentesFiltradosEAgrupados = agruparPorAppId(filtradosPorApp);

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="flex-start">
        <Flex alignItems="center" gap="4">
          <Text fontSize="lg" color="gray.700" fontWeight="semibold">
            Assistentes
          </Text>
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
          </Flex>
        </Flex>
      </Flex>
      <Flex wrap="wrap" gap="8" mt="8">
        {Object.entries(assistentesFiltradosEAgrupados).map(([key, grupo]) => {
          return (
            <Box key={key} p="2">
              <Flex justifyContent="space-between" mb="4">
                <Box px="2" py="1" rounded="md">
                  <Text color="brand.600" fontSize="sm">
                    {grupo?.nome}
                  </Text>
                </Box>
              </Flex>
              <Flex px="2" gap="4">
                {grupo.assistentes?.map((item) => (
                  <AssistenteConfigDialog
                    defaultValues={{
                      ...item,
                      aplicativo: item?.aplicativo?._id,
                    }}
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
      </Flex>
    </Box>
  );
};
