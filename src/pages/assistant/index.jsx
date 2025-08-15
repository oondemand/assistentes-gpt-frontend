import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { Filter, Table } from "lucide-react";
import { AssistantConfigService } from "../../service/assistant-config";
import { DebouncedInput } from "../../components/DebouncedInput";
import { useQueryParam } from "../../hooks/useQueryParam";
import { Link } from "react-router-dom";
import { Tooltip } from "../../components/ui/tooltip";

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
            assistente?._id === term ||
            assistente?.aplicativo === term
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
            <Button unstyled cursor="pointer" onClick={() => setSearchTerm("")}>
              <Filter size={22} />
            </Button>

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
          </Flex>
        </Flex>
      </Flex>
      <Flex wrap="wrap" gap="8" mt="8">
        {assistentesFiltrados?.map((item) => (
          <Box
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
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
