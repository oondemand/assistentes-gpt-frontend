import { api } from "../config/api";

const listarAplicativos = async () => {
  const { data } = await api.get(`/aplicativos`);
  return data;
};

const sincronizar = async () => {
  return await api.post("/aplicativos/sincronizar");
};

export const AplicativoService = {
  sincronizar,
  listarAplicativos,
};
