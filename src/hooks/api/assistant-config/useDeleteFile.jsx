import { useMutation } from "@tanstack/react-query";
import { toaster } from "../../../components/ui/toaster";
import { AssistantConfigService } from "../../../service/assistant-config";

export const useDeleteFileFromAssistente = ({ onSuccess }) =>
  useMutation({
    mutationFn: async ({ arquivoId, assistenteId }) =>
      await AssistantConfigService.removerArquivo({
        arquivoId,
        assistenteId,
      }),
    onSuccess: (data) => {
      onSuccess?.(data);
      toaster.create({
        title: "Arquivo deletado com sucesso!",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Erro ao remover arquivo",
        description: error?.response?.data?.message,
        type: "error",
      });
    },
  });
