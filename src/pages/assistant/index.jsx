import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { Filter, Table } from "lucide-react";
import { AssistantConfigService } from "../../service/assistant-config";
import { DebouncedInput } from "../../components/DebouncedInput";
import { useQueryParam } from "../../hooks/useQueryParam";
import { Link } from "react-router-dom";
import { Tooltip } from "../../components/ui/tooltip";
import { AssistenteConfigDialog } from "./dialog";
import { DefaultTrigger } from "../../components/formDialog/form-trigger";

export const Assistentes = () => {
  const [searchTerm, setSearchTerm] = useQueryParam("searchTerm");

  const { data } = useQuery({
    queryFn: AssistantConfigService.listarAssistenteAtivos,
    queryKey: ["assistentes-ativos"],
    staleTime: 1000 * 60, //1m
    placeholderData: keepPreviousData,
  });

  const assistentesFiltrados =
    searchTerm?.toLowerCase()?.trim()?.length > 2
      ? data?.assistentes?.filter((assistente) => {
          const term = searchTerm?.toLowerCase()?.trim();
          return (
            assistente?.nome?.toLowerCase()?.includes(term) ||
            assistente?.aplicativo?.nome?.toLowerCase().includes(term) ||
            assistente?._id === searchTerm ||
            assistente?.aplicativo?._id === searchTerm ||
            assistente?.aplicativo?.appKey === searchTerm
          );
        })
      : data?.assistentes;

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
                color="purple.700"
                bg="purple.200"
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
                onClick={() => setSearchTerm("")}
              >
                <Filter size={22} />
              </Button>
            </Tooltip>

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
                    title="Novo assistente"
                    bg="purple.100"
                    color="purple.700"
                    _hover={{ bg: "purple.200" }}
                  />
                );
              }}
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex wrap="wrap" gap="8" mt="8">
        {assistentesFiltrados?.map((item) => (
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
                  w="256px"
                  shadow="xs"
                >
                  <Text fontSize="sm">{item?.nome}</Text>
                  <Text lineClamp={3} fontSize="xs" mt="2">
                    {item?.descricao}
                  </Text>
                  <Flex
                    mt="4"
                    gap="4"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box bg="gray.50" px="2" py="1" rounded="md" shadow="xs">
                      <Text color="brand.500" fontSize="sm">
                        {item?.aplicativo?.nome}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              );
            }}
          />
        ))}
      </Flex>
    </Box>
  );
};
