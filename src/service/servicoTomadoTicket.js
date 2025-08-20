import { api } from "../config/api";

const adicionarTicket = async ({ body, origem }) => {
  const response = await api.post("/servicos-tomados/tickets", body, {
    headers: {
      "x-origem": origem,
    },
  });
  return response.data;
};

const alterarTicket = async ({ id, body, origem }) => {
  const response = await api.patch(`/servicos-tomados/tickets/${id}`, body, {
    headers: {
      "x-origem": origem,
    },
  });
  return response.data;
};

const carregarTicket = async (id) => {
  const response = await api.get(`/servicos-tomados/tickets/${id}`);
  return response.data;
};

const listarTickets = async ({ filters }) => {
  const { data } = await api.get("/servicos-tomados/tickets", {
    params: filters,
  });
  return data;
};

const aprovarTicket = async ({ id, origem }) => {
  const response = await api.post(
    `/servicos-tomados/tickets/${id}/aprovar`,
    {},
    {
      headers: {
        "x-origem": origem,
      },
    }
  );
  return response.data;
};

const reprovarTicket = async ({ id, origem }) => {
  const response = await api.post(
    `/servicos-tomados/tickets/${id}/reprovar`,
    {},
    {
      headers: {
        "x-origem": origem,
      },
    }
  );
  return response.data;
};

const uploadFiles = async ({ ticketId, files }) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append("arquivos", file);
  }

  return await api.post(
    `/servicos-tomados/tickets/${ticketId}/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const deleteFile = async ({ id, ticketId }) => {
  return await api.delete(
    `/servicos-tomados/tickets/arquivo/${ticketId}/${id}`
  );
};

const arquivarTicket = async ({ id, origem }) => {
  return await api.post(
    `/servicos-tomados/tickets/arquivar/${id}`,
    {},
    {
      headers: {
        "x-origem": origem,
      },
    }
  );
};

const adicionarServico = async ({ ticketId, servicoId, origem }) => {
  const { data } = await api.post(
    `/servicos-tomados/tickets/adicionar-servico/${ticketId}/${servicoId}`,
    {},
    {
      headers: {
        "x-origem": origem,
      },
    }
  );

  return data;
};

const removerServico = async ({ servicoId, origem }) => {
  const { data } = await api.post(
    `/servicos-tomados/tickets/remover-servico/${servicoId}`,
    {},
    {
      headers: {
        "x-origem": origem,
      },
    }
  );
  return data;
};

const adicionarDocumentoFiscal = async ({
  ticketId,
  documentoFiscalId,
  origem,
}) => {
  const { data } = await api.post(
    `/servicos-tomados/tickets/adicionar-documento-fiscal/${ticketId}/${documentoFiscalId}`,
    {},
    {
      headers: {
        "x-origem": origem,
      },
    }
  );

  return data;
};

const removerDocumentoFiscal = async ({ documentoFiscalId, origem }) => {
  const { data } = await api.post(
    `/servicos-tomados/tickets/remover-documento-fiscal/${documentoFiscalId}`,
    {},
    {
      headers: {
        "x-origem": origem,
      },
    }
  );
  return data;
};

const listarTicketsArquivados = async ({ filters }) => {
  const { data } = await api.get("/servicos-tomados/tickets/arquivados", {
    params: filters,
  });
  return data;
};

const listarTicketsPagos = async ({ filters }) => {
  const { data } = await api.get("/servicos-tomados/tickets/pagos", {
    params: filters,
  });
  return data;
};

export const ServicoTomadoTicketService = {
  listarTickets,
  adicionarTicket,
  alterarTicket,
  arquivarTicket,
  aprovarTicket,
  reprovarTicket,
  deleteFile,
  uploadFiles,
  removerServico,
  adicionarServico,
  listarTicketsArquivados,
  listarTicketsPagos,
  adicionarDocumentoFiscal,
  removerDocumentoFiscal,
  carregarTicket,
};
