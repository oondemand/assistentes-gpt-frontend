import { useMutation } from "@tanstack/react-query";
import { toaster } from "../../../components/ui/toaster";
import { AssistantConfigService } from "../../../service/assistant-config";

export const useUploadFileToAssistente = ({ onSuccess }) =>
  useMutation({
    mutationFn: async ({ file, id }) =>
      await AssistantConfigService.anexarArquivo({
        id,
        file,
      }),
    onSuccess: (data) => {
      onSuccess?.(data);
      toaster.create({
        title: "Arquivo anexado com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao anexar arquivo!",
        description: error?.response?.data?.message,
        type: "error",
      });
    },
  });
