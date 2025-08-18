import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/_layouts/main";
// import { LoginPage } from "./pages/login";
import { AuthLayout } from "./components/_layouts/auth";
// import { PessoasList } from "./pages/pessoa/list";
// // import { ServicosList } from "./pages/servicos/list";
// import { ServicosTomados } from "./pages/servicosTomados";
// import { Dashboard } from "./pages/dashboard";
// import { Doc } from "./pages/doc";
// import { PlanejamentoMensal } from "./pages/planejamentoMensal";
// import { ImportPessoasPage } from "./pages/pessoa/importacao";
// import { UsuariosPage } from "./pages/usuarios/index";
// import { AlterarSenha } from "./pages/alterarSenha";
// import { RegistrosPage } from "./pages/registros";
// import { Listas } from "./pages/listas";
import { SistemaPage } from "./pages/sistema";
// import { TicketsPagosPage } from "./pages/ticketsPagos"
// import { EtapasPage } from "./pages/etapas";
// import { DocumentosFiscaisList } from "./pages/documentoFiscal";
// import { ImportDocumentosFiscaisPage } from "./pages/documentoFiscal/importacao"
import { AssistentesDatagrid } from "./pages/assistant/datagrid";
// import { DocumentosCadastraisList } from "./pages/documentoCadastral";
// import { ImportDocumentosCadastraisPage } from "./pages/documentoCadastral/importacao";
import { Ativacao } from "./pages/ativacao";
// import { ServicosList } from "./pages/servicos";
// import { ImportServicosPage } from "./pages/servicos/importacao";
// import ChangelogPage from "./pages/changelog";
// import { IntegracaoPessoaCentralOmieEsteira } from "./pages/integracao/pessoa/central-omie";
// import { IntegracaoPessoaCentralOmieDatagrid } from "./pages/integracao/pessoa/central-omie/datagrid";
// import { IntegracaoContaPagarCentralOmieEsteira } from "./pages/integracao/contaPagar/central-omie";
// import { IntegracaoContaPagarCentralOmieDatagrid } from "./pages/integracao/contaPagar/central-omie/datagrid";
// import { IntegracaoPessoaOmieCentralEsteira } from "./pages/integracao/pessoa/omie-central";
// import { IntegracaoPessoaOmieCentralDatagrid } from "./pages/integracao/pessoa/omie-central/datagrid";
// import { IntegracaoContaPagarOmieCentralEsteira } from "./pages/integracao/contaPagar/omie-central";
// import { IntegracaoContaPagarOmieCentralDatagrid } from "./pages/integracao/contaPagar/omie-central/datagrid";
// import { IntegracaoAnexosCentralOmieEsteira } from "./pages/integracao/anexos/central-omie";
// import { IntegracaoAnexosCentralOmieDatagrid } from "./pages/integracao/anexos/central-omie/datagrid";
// import { MoedaPage } from "./pages/moeda";
// import { DocumentosFiscais } from "./pages/documentosFiscais/list";
// import { ImportDocumentosFiscaisPage } from "./pages/documentosFiscais/importacao";
// import RoteiroDeTestes from "./pages/roteiroDeTestes";
// import { IntegracoesConfigPage } from "./pages/integracao/configuracao";
import { Home } from "./pages/home";
import { Assistentes } from "./pages/assistant";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Assistentes /> },
      // {
      //   path: "/servicos-tomados",
      //   element: <ServicosTomados />,
      // },
      // { path: "/planejamento", element: <PlanejamentoMensal /> },
      // { path: "/pessoas", element: <PessoasList /> },
      // { path: "/pessoas/importacao", element: <ImportPessoasPage /> },
      // { path: "/servicos", element: <ServicosList /> },
      // { path: "/servicos/importacao", element: <ImportServicosPage /> },
      // { path: "/documentos-fiscais", element: <DocumentosFiscais /> },
      // {
      //   path: "/documentos-fiscais/importacao",
      //   element: <ImportDocumentosFiscaisPage />,
      // },
      // { path: "/documentos-cadastrais", element: <DocumentosCadastraisList /> },
      // {
      //   path: "/documentos-cadastrais/importacao",
      //   element: <ImportDocumentosCadastraisPage />,
      // },
      // { path: "/usuarios", element: <UsuariosPage /> },
      // { path: "/registros", element: <RegistrosPage /> },
      // { path: "/listas", element: <Listas /> },
      { path: "/sistema", element: <SistemaPage /> },
      // { path: "/doc", element: <Doc /> },
      // { path: "/changelog", element: <ChangelogPage /> },
      // { path: "/roteiro-de-testes", element: <RoteiroDeTestes /> },
      // { path: "/pagos", element: <TicketsPagosPage /> },
      // { path: "/etapas", element: <EtapasPage /> },
      // { path: "/assistentes", element: <Assistentes /> },
      { path: "/assistentes/todos", element: <AssistentesDatagrid /> },
      // { path: "/moedas", element: <MoedaPage /> },
      // { path: "/configuracoes/integracao", element: <IntegracoesConfigPage /> },
      // {
      //   path: "/integracao",
      //   children: [
      //     {
      //       path: "/integracao/pessoa/central-omie",
      //       element: <IntegracaoPessoaCentralOmieEsteira />,
      //     },
      //     {
      //       path: "/integracao/pessoa/central-omie/todos",
      //       element: <IntegracaoPessoaCentralOmieDatagrid />,
      //     },
      //     {
      //       path: "/integracao/pessoa/omie-central",
      //       element: <IntegracaoPessoaOmieCentralEsteira />,
      //     },
      //     {
      //       path: "/integracao/pessoa/omie-central/todos",
      //       element: <IntegracaoPessoaOmieCentralDatagrid />,
      //     },
      //     {
      //       path: "/integracao/conta-pagar/central-omie",
      //       element: <IntegracaoContaPagarCentralOmieEsteira />,
      //     },
      //     {
      //       path: "/integracao/conta-pagar/central-omie/todos",
      //       element: <IntegracaoContaPagarCentralOmieDatagrid />,
      //     },
      //     {
      //       path: "/integracao/conta-pagar/omie-central",
      //       element: <IntegracaoContaPagarOmieCentralEsteira />,
      //     },
      //     {
      //       path: "/integracao/conta-pagar/omie-central/todos",
      //       element: <IntegracaoContaPagarOmieCentralDatagrid />,
      //     },
      //     {
      //       path: "/integracao/anexos/central-omie",
      //       element: <IntegracaoAnexosCentralOmieEsteira />,
      //     },
      //     {
      //       path: "/integracao/anexos/central-omie/todos",
      //       element: <IntegracaoAnexosCentralOmieDatagrid />,
      //     },
      //   ],
      // },
    ],
  },

  {
    path: "/",
    element: <MainLayout />,
    children: [
      // { path: "/login", element: <LoginPage /> },
      // { path: "/alterar-senha", element: <AlterarSenha /> },
      { path: "/ativacao", element: <Ativacao /> },
    ],
  },
]);
