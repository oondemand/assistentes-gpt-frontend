import { api } from "../config/api";

const getFile = async ({ id }) => {
  return await api.get(`/arquivos/${id}`);
};

export const ArquivoService = {
  getFile,
};
