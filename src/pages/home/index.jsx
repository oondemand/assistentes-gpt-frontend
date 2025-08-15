import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { Filter } from "lucide-react";
import { AplicativoService } from "../../service/aplicativo";
import { DebouncedInput } from "../../components/DebouncedInput";
import { useAuth } from "../../hooks/useAuth";
import { useStateWithStorage } from "../../hooks/useStateStorage";
import { AppCard } from "./card";

export const Home = () => {
  const [searchTerm, setSearchTerm] = useStateWithStorage("searchTerm");
  // const { user } = useAuth();

  const { data } = useQuery({
    queryFn: AplicativoService.listarAplicativos,
    queryKey: ["listar-aplicativos"],
    staleTime: 1000 * 60, //1m
    placeholderData: keepPreviousData,
  });

  console.log("Data", data);

  const aplicativosFiltrados =
    searchTerm?.toLowerCase()?.trim()?.length > 2
      ? data?.aplicativos.filter((aplicativo) => {
          const term = searchTerm?.toLowerCase()?.trim();
          return aplicativo?.nome?.toLowerCase()?.includes(term);
        })
      : data?.aplicativos;

  return (
    <>
      <Flex justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Text color="gray.400" fontSize="xs">
            Visão geral
          </Text>
          <Text color="gray.700" fontSize="lg">
            Aplicativos
          </Text>
        </Box>
        <Flex gap="4">
          <Flex alignItems="center" color="gray.400" gap="3">
            <Filter size={22} />
            <DebouncedInput
              size="sm"
              w="xs"
              bg="white"
              placeholder="Pesquisar aplicativo"
              rounded="sm"
              _placeholder={{ color: "gray.400" }}
              placeIcon="right"
              iconSize={16}
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </Flex>

          {/* {user && user?.tipo === "master" && (
            <CadastrarAplicativoDialog>
              <Button size="sm" colorPalette="cyan">
                Cadastrar aplicativo
              </Button>
            </CadastrarAplicativoDialog>
          )} */}
        </Flex>
      </Flex>

      <Flex mt="8" gap="4">
        {aplicativosFiltrados &&
          aplicativosFiltrados?.map((app) => {
            return <AppCard key={app?._id} aplicativo={app} />;
          })}
      </Flex>
    </>
  );
};
