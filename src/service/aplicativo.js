import { api } from "../config/api";

const listarAplicativos = async () => {
  const { data } = await api.get(`/aplicativos`);
  return data;
};

export const AplicativoService = {
  listarAplicativos,
};
