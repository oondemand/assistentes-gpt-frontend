import { IconButton } from "@chakra-ui/react";
import { Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "../../ui/toaster";
import { PessoaService } from "../../../service/pessoa";
import { Tooltip } from "../../ui/tooltip";

export const EnviarConvitePrestadorAction = ({ prestador }) => {
  const { mutateAsync: enviarConviteUsuarioPrestador, isPending } = useMutation(
    {
      mutationFn: async () =>
        await PessoaService.enviarConvite({ prestador: prestador?._id }),
      onSuccess() {
        toaster.create({
          title: "Convite enviado!",
          description: "Verifique a caixa de emails!",
          type: "success",
        });
      },
      onError: (error) => {
        toaster.create({
          title: "Ouve um erro ao enviar convite!",
          description: "Um erro inesperado aconteceu ao enviar convite!",
          type: "error",
        });
      },
    }
  );

  const handleDeleteServico = async () => {
    if (!prestador?.email) {
      return toaster.create({
        title: "Erro ao enviar convite!",
        description: "Um email válido é obrigatório para fazer o acesso.",
        type: "error",
      });
    }

    await enviarConviteUsuarioPrestador();
  };

  return (
    <Tooltip content="Enviar convite" openDelay={700} closeDelay={50}>
      <IconButton
        disabled={isPending}
        variant="surface"
        colorPalette="blue"
        size="2xs"
        onClick={handleDeleteServico}
      >
        <Send />
      </IconButton>
    </Tooltip>
  );
};
