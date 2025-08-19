# assistentes-gpt-frontend

![GitHub stars](https://img.shields.io/github/stars/oondemand/cst-backend)
![GitHub issues](https://img.shields.io/github/issues/oondemand/cst-backend)
![GitHub license](https://img.shields.io/github/license/oondemand/cst-backend)
[![Required Node.JS >=18.0.0](https://img.shields.io/static/v1?label=node&message=%20%3E=18.0.0&logo=node.js&color=3f893e)](https://nodejs.org/about/releases)

## Índice

- [1. Visão Geral do Projeto](#1-visão-geral-do-projeto)
- [2. Tecnologias Utilizadas](#2-tecnologias-utilizadas)
- [3. Estrutura de Pastas](#3-estrutura-de-pastas)
- [4. Instalação](#4-instalação)
- [5. Deploy automático](#5-deploy-automático---ambiente-de-homologação)
  - [5.1 Como Funciona o Deploy](#51-como-funciona-o-deploy)
  - [5.2 Arquivos Importantes](#52-arquivos-importantes)
  - [5.3 Variáveis de Ambiente Utilizadas](#53-variáveis-de-ambiente-utilizadas)
- [6. Guia de Contribuição](#6-guia-de-contribuição)
  - [6.1 Como Contribuir](#61-como-contribuir)
  - [6.2 Padrões de Código](#62-padrões-de-código)
  - [6.3 Commits](#63-commits)
  - [6.4 Feedback](#64-feedback)

## 1. Visão Geral do Projeto

O **assistentes-gpt-frontend** é uma aplicação desenvolvida em **React.js**, que faz parte da plataforma **OonDemand v2**. A aplicação fornece uma interface amigável e responsiva para gerenciar tickets, prestadores de serviço, integrações com o sistema Omie, e outras operações administrativas. O frontend foi desenvolvido para proporcionar uma experiência de usuário fluida e intuitiva, utilizando práticas modernas de desenvolvimento.

## 2. Tecnologias Utilizadas

- **React.js**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Chakra UI**: Biblioteca de componentes acessíveis e estilizados para aplicações React.
- **Axios**: Cliente HTTP para integração com o backend.
- **React Router**: Gerenciamento de rotas e navegação entre páginas.
- **React Hook Form + Zod**: Gerenciamento de formulários e validação com alta performance e integração nativa com TypeScript.
- **TanStack React Table**: Biblioteca poderosa para criação de tabelas altamente customizáveis.
- **TanStack React Virtual**: Renderização virtualizada para listas e tabelas de grande volume.
- **TanStack React Query**: Gerenciamento de estado assíncrono e cache de dados de forma eficiente.

## 3. Estrutura de Pastas

A estrutura de pastas da aplicação segue uma organização por domínio para facilitar o desenvolvimento:

```
src/
├── components/   # Componentes reutilizáveis e isolados da UI
├── config/       # Configurações básicas da aplicação, como React Query, Axios, etc.
├── constants/    # Constantes e valores padrão, como valores iniciais de formulários
├── hooks/        # Hooks personalizados para lógica reutilizável
├── pages/        # Páginas da aplicação, representando rotas principais
├── service/      # Serviços de comunicação com APIs externas
├── styles/       # Estilos globais e personalizados
└── utils/        # Funções utilitárias e esquemas de validação (ex: Zod)
```

## 4. Instalação

### Você vai precisar de:

- [NodeJs (recomendado 18+)](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [CST-Backend](https://github.com/oondemand/cst-backend)

> Para ter acesso de todas as funcionalidades (integração com gpt) da aplicação você também ira precisar configurar alguns serviços locais como [Doc-custom](https://github.com/oondemand/fatura-personalizada-backend) e [Api-integração-gpt](https://github.com/oondemand/api-integracao-gpt)

### Passo a passo

1. Clone esse repositório localmente:

```bash
git clone https://github.com/oondemand/assistentes-gpt-frontend.git
cd assistentes-gpt-frontend
```

2. Instale as dependências

```bash
npm install
```

3. Execute a aplicação:

```bash
npm run dev
```

## 5 Deploy Automático - Ambiente de Homologação

Este repositório utiliza **GitHub Actions** para realizar o deploy automático do frontend no ambiente de **homologação**, sempre que houver um _push_ na branch `homolog`.

### 5.1 Como Funciona o Deploy

O processo de deploy é totalmente automatizado e ocorre da seguinte forma:

1. **Disparo do Workflow**  
   Sempre que houver um `push` na branch `homolog`, o GitHub Actions inicia o processo de deploy.

2. **Etapas do Workflow**

   - **Checkout do repositório**  
     Clona o código da branch `homolog`.

   - **Configuração do Git**  
     Define as credenciais de usuário para futuras operações Git.

   - **Instalação de dependências**  
     Executa `npm install` para instalar as dependências do projeto.

   - **Criação de uma nova release**  
     Usa o comando `npm run release` para gerar uma nova tag de versão com a ferramenta `release-it`.

   - **Extração da tag criada**  
     Recupera a tag gerada na etapa anterior para utilizar como identificador da versão da imagem Docker.

   - **Build e publicação da imagem Docker**

     - Faz login no GitHub Container Registry (GHCR).
     - Constrói a imagem Docker com variáveis de ambiente específicas do ambiente de homologação.
     - Publica a imagem no repositório `ghcr.io`.

   - **Configuração do acesso ao cluster Kubernetes**  
     Cria o arquivo `kubeconfig` usando token e endpoint do cluster de homologação.

   - **Deploy no Kubernetes**  
     Substitui variáveis no arquivo `deployment-homolog.yaml` com `envsubst` e aplica no cluster com `kubectl apply`.

### 5.2 Arquivos Importantes

- `infra/docker/Dockerfile.prod` – Dockerfile usado para build da imagem.
- `infra/kubernetes/deployment-homolog.yaml` – Template do deployment Kubernetes.
- `.github/workflows/deploy-homolog.yml` – Workflow de deploy para homologação.

### 5.3 Variáveis de Ambiente Utilizadas

As variáveis sensíveis são gerenciadas através dos **secrets** do GitHub:

| Variável                                | Descrição                                                                 |
| --------------------------------------- | ------------------------------------------------------------------------- |
| `GITHUB_TOKEN`                          | Token padrão do GitHub usado para autenticar ações dentro do repositório. |
| `DOCKER_USERNAME`                       | Nome de usuário para login no GitHub Container Registry (GHCR).           |
| `GH_PAT`                                | Token pessoal do GitHub com permissão para push de imagens no GHCR.       |
| `VITE_API_URL_HOMOLOG`                  | URL da API utilizada pela aplicação no ambiente de homologação.           |
| `VITE_DOC_CUSTOM_URL`                   | URL do sistema de geração de templates de documentos personalizados.      |
| `VITE_API_INTEGRACAO_GPT_URL`           | URL da API de integração com o serviço GPT usada na aplicação.            |
| `DO_ACCESS_TOKEN_HOMOLOG`               | Token de acesso à DigitalOcean para autenticação no cluster Kubernetes.   |
| `DO_CLUSTER_AUTHENTICATION_URL_HOMOLOG` | Endpoint para obter credenciais de acesso ao cluster de homologação.      |
| `CLUSTER_HOMOLOG`                       | Nome do contexto do cluster Kubernetes de homologação.                    |

## 6 Guia de Contribuição

Obrigado por querer contribuir com este projeto! 🎉  
Siga os passos abaixo para garantir que sua contribuição seja bem-sucedida.

### 6.1 Como contribuir

- [ ] Faça um fork do repositório
- [ ] Crie uma nova branch descritiva: `git checkout -b feat/nome-da-sua-feature`
- [ ] Faça suas alterações e adicione testes, se necessário
- [ ] Confirme as alterações: `git commit -m "feat: adiciona nova feature"`
- [ ] Envie a branch: `git push origin feat/nome-da-sua-feature`
- [ ] Crie um Pull Request explicando as mudanças realizadas

### 6.2 Padrões de código

- Mantenha o código limpo e legível
- Siga a estrutura e padrões já existentes
- Evite adicionar dependências desnecessárias

### 6.3 Commits

Use o [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/):

Exemplos:

- `feat: adiciona botão de login`
- `fix: corrige erro ao carregar usuários`
- `refactor: melhora performance do datagrid`

### 6.4 Feedback

Se tiver dúvidas ou sugestões, abra uma **Issue** para discutirmos.  
Sua colaboração é sempre bem-vinda! 🚀
