import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../config/api";
import { toaster } from "../../components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { useHookFormMask } from "use-mask-input";
import { env } from "../../config/env";

const schema = z.object({
  appKey: z.string().nonempty({ message: "App Secret é um campo obrigatório" }),
});

export const Ativacao = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      usuario: {
        tipo: "admin",
      },
    },
  });

  const ativacaoMutation = useMutation({
    mutationFn: async (data) => {
      await api.post("/ativacao", data);
    },
    onError: (error) => {
      toaster.create({
        title: "Erro ao ativar",
        description: error.response?.data?.message,
        type: "error",
      });
    },
    onSuccess: () => {
      toaster.create({
        title: "Ativação realizada com sucesso",
        type: "success",
      });

      window.location.href = `${env.VITE_MEUS_APPS_URL}/login`;

      // navigate("/login", { viewTransition: true });
    },
  });

  const onSubmit = async (data) => {
    await ativacaoMutation.mutateAsync(data);
  };

  return (
    <Center h="full" bg="#F8F9FA">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          width={{ base: "90%", md: "800px" }}
          boxShadow="lg"
          borderRadius="lg"
          overflow="hidden"
          py="5"
          px="6"
          bg="white"
          color="gray.700"
          position="relative"
          borderLeft="2px solid"
          borderColor="cyan.500"
        >
          <Heading>Assistentes</Heading>
          <Text>Formulário de ativação</Text>

          <Box w="xs" mt="6">
            <Text fontSize="sm" fontWeight="medium">
              Chave do aplicativo (appKey)
            </Text>
            <Input
              mt="1"
              size="sm"
              focusRingColor="brand.350"
              placeholder="Chave do aplicativo..."
              {...register("appKey")}
            />
            {errors.usuario?.nome?.message && (
              <Text fontSize="xs" mt="0.5" color="red.500">
                {errors.appKey.message}
              </Text>
            )}
          </Box>

          <Box mt="6">
            <Button
              disabled={ativacaoMutation.isPending}
              w="2xs"
              colorPalette="cyan"
              type="submit"
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </form>
    </Center>
  );
};
