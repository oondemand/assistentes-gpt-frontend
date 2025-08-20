import { api } from "../config/api";

const listarAssistenteAtivos = async () => {
  const { data } = await api.get("/assistentes/ativos");
  return data;
};

const anexarArquivo = async ({ id, file }) => {
  const formData = new FormData();
  formData.append("arquivo", file);

  return await api.post(`/assistentes/${id}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const removerArquivo = async ({ assistenteId, arquivoId }) => {
  return await api.post(
    `/assistentes/${assistenteId}/remover-arquivo/${arquivoId}`
  );
};

const listarAssistenteConfig = async ({ filters }) => {
  const { data } = await api.get("/assistentes", { params: filters });
  return data;
};

const alterarAssistenteConfig = async ({ id, body, origem }) => {
  const { data } = await api.put(`/assistentes/${id}`, body, {
    headers: {
      "x-origem": origem,
    },
  });
  return data;
};

const adicionarAssistenteConfig = async ({ body, origem }) => {
  const { data } = await api.post("/assistentes", body, {
    headers: {
      "x-origem": origem,
    },
  });
  return data;
};

const deleteAssistantConfig = async ({ id, origem }) => {
  return await api.delete(`assistentes/${id}`, {
    headers: {
      "x-origem": origem,
    },
  });
};

export const AssistantConfigService = {
  anexarArquivo,
  removerArquivo,
  deleteAssistantConfig,
  listarAssistenteConfig,
  listarAssistenteAtivos,
  alterarAssistenteConfig,
  adicionarAssistenteConfig,
};
