import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import {
  FileUploadRoot,
  FileUploadTrigger,
} from "../../components/ui/file-upload";
import { Tooltip } from "../../components/ui/tooltip";
import { AssistantConfigService } from "../../service/assistant-config";
import { useUploadFileToAssistente } from "../../hooks/api/assistant-config/useUploadFIle";
import { CircleX, Download, Paperclip, Upload } from "lucide-react";
import { ArquivoService } from "../../service/arquivo";
import { saveAs } from "file-saver";
import { queryClient } from "../../config/react-query";
import { useDeleteFileFromAssistente } from "../../hooks/api/assistant-config/useDeleteFile";
import { useConfirmation } from "../../hooks/useConfirmation";

export const UploadAnexos = ({ assistente }) => {
  const { requestConfirmation } = useConfirmation();

  const anexarArquivoMutation = useUploadFileToAssistente({
    onSuccess: () => queryClient.invalidateQueries(["assistentes-ativos"]),
  });

  const removerArquivoMutation = useDeleteFileFromAssistente({
    onSuccess: () => queryClient.invalidateQueries(["assistentes-ativos"]),
  });

  const handleDownloadFile = async ({ id }) => {
    try {
      const { data } = await ArquivoService.getFile({ id });

      if (data.arquivo) {
        const byteArray = new Uint8Array(data.arquivo?.buffer?.data);
        const blob = new Blob([byteArray], { type: data.arquivo?.mimetype });
        saveAs(blob, data.arquivo?.nome);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDeleteFileFromTicket = async ({ id }) => {
    const { action } = await requestConfirmation({
      title: "Tem que deseja remover arquivo?",
      description: "Essa ação não pode ser desfeita!",
    });

    if (action === "confirmed") {
      await removerArquivoMutation.mutateAsync({
        arquivoId: id,
        assistenteId: assistente?._id,
      });
    }
  };

  return (
    <Box mt="6" p="4" border="1px dashed" rounded="md" borderColor="gray.200">
      <Flex alignItems="center" pb="2">
        <Text fontWeight="medium">Base de conhecimento (arquivos)</Text>
        <FileUploadRoot
          onFileAccept={async (e) => {
            await anexarArquivoMutation.mutateAsync({
              file: e.files[0],
              id: assistente._id,
            });
          }}
        >
          <FileUploadTrigger
            disabled={anexarArquivoMutation.isPending}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <Tooltip content="Anexar arquivo">
              <Button variant="outline" size="xs">
                <Upload />
                Upload
              </Button>
            </Tooltip>
          </FileUploadTrigger>
        </FileUploadRoot>
      </Flex>
      {assistente?.arquivos?.map((item) => (
        <Flex
          justifyContent="space-between"
          mt="4"
          key={item?._id}
          borderBottom="1px solid"
          py="1.5"
          borderColor="gray.100"
        >
          <Text
            fontSize="sm"
            color="gray.500"
            fontWeight="normal"
            display="flex"
            gap="2"
            alignItems="center"
          >
            <Paperclip color="purple" size={14} />
            {item?.nome}
            {"  "}
            {(item?.size / 1024).toFixed(1)} KB
          </Text>
          <Flex gap="2">
            <Button
              onClick={async () => await handleDownloadFile({ id: item?._id })}
              cursor="pointer"
              unstyled
            >
              <Download size={16} />
            </Button>
            {/* {!onlyReading && ( */}
            <Button
              onClick={async () =>
                await handleDeleteFileFromTicket({
                  id: item?._id,
                })
              }
              color="red"
              cursor="pointer"
              unstyled
            >
              <CircleX size={16} />
            </Button>
            {/* )} */}
          </Flex>
        </Flex>
      ))}
    </Box>
  );
};
