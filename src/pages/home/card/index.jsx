import { Box, Flex, Text, Button, Badge } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
// import { useConfirmation } from "../../../hooks/useConfirmation";

export const AppCard = ({ aplicativo }) => {
  const { user } = useAuth();
  // const { requestConfirmation } = useConfirmation();

  // const handleDeleteApp = async ({ id }) => {
  //   const { action } = await requestConfirmation({
  //     title: "Tem certeza ?",
  //     description: "Essa ação não pode ser desfeita!",
  //   });

  //   if (action === "confirmed") {
  //     // return onDeleteAplicativo.mutateAsync({ id });
  //   }
  // };

  return (
    <Box h="56" w="80" bg="white" shadow="xs" rounded="2xl" position="relative">
      {/* <Flex
        p="3"
        justifyContent="space-between"
        alignItems="center"
        w="full"
        color="gray.600"
        borderBottom="1px solid"
        borderColor="gray.100"
      > */}
      {/* <Flex gap="2" alignItems="center">
          <Badge
            size="md"
            rounded="md"
            colorPalette={APP_STATUS_MAP[aplicativo?.status]?.color}
          >
            {APP_STATUS_MAP[aplicativo?.status]?.label}
          </Badge>
          <Badge
            size="md"
            rounded="md"
            colorPalette={AMBIENTES_MAP[aplicativo?.ambiente]?.color}
          >
            {AMBIENTES_MAP[aplicativo?.ambiente]?.label}
          </Badge>
        </Flex> */}

      {/* <Flex alignItems="center" gap="3"> */}
      {/* <MenuRoot positioning={{ placement: "bottom-end" }}>
            <MenuTrigger
              color="brand.600"
              focusRing="none"
              cursor="pointer"
              alignItems="baseline"
            >
              <Settings />
            </MenuTrigger>
            <MenuContent cursor="pointer" fontWeight="semibold">
              <MenuItem
                onClick={() => {}}
                cursor="pointer"
                _hover={{ bg: "gray.50" }}
              >
                <User size={14} />
                <a
                  href={`/aplicativos/${aplicativo?._id}/usuarios`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Usuários
                </a>
              </MenuItem>
              {user && user?.tipo === "master" && (
                <CadastrarAplicativoDialog defaultValues={aplicativo}>
                  <Button
                    unstyled
                    display="flex"
                    px="2"
                    py="1.5"
                    gap="2"
                    alignItems="center"
                    _hover={{ bg: "gray.50" }}
                    cursor="pointer"
                    fontSize="sm"
                  >
                    <Pencil size={14} /> Editar aplicativo
                  </Button>
                </CadastrarAplicativoDialog>
              )}
              {user && user?.tipo === "master" && (
                <MenuItem
                  onClick={() => handleDeleteApp({ id: aplicativo?._id })}
                  cursor="pointer"
                  _hover={{ bg: "red.50" }}
                >
                  <Trash size={14} /> Excluir aplicativo
                </MenuItem>
              )}
            </MenuContent>
          </MenuRoot> */}
      {/* </Flex> */}
      {/* </Flex> */}

      <Flex p="4" gap="2.5">
        <Flex
          rounded="2xl"
          bg="purple.100"
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
          w="50px"
          h="50px"
        >
          {aplicativo?.icone ? (
            <img
              src={aplicativo?.icone}
              alt="ícone"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Text fontWeight="bold" color="gray.500" fontSize="3xl">
              {aplicativo?.nome?.[0]?.toUpperCase() ?? "?"}
            </Text>
          )}
        </Flex>
        <Text fontSize="2xl" fontWeight="semibold">
          {aplicativo?.nome}
        </Text>
      </Flex>

      <Link to={`/assistentes?searchTerm=${aplicativo?.nome}`}>
        <Button
          unstyled
          position="absolute"
          fontWeight="semibold"
          py="2"
          px="4"
          bottom="2"
          right="4"
          bg="cyan.500"
          rounded="2xl"
          color="white"
          cursor="pointer"
        >
          Ver assistentes
        </Button>
      </Link>
    </Box>
  );
};
