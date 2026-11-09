import type { ResearchEntry } from "./types";

/**
 * Pesquisa em andamento — caderno de investigações.
 *
 * Os temas derivam dos interesses declarados (APIs, integração, automação,
 * dados). Descrições específicas são provisórias até serem confirmadas.
 */
export const research: ResearchEntry[] = [
  {
    id: "001",
    kind: "Assunto",
    status: "Em estudo",
    title: "Arquitetura de APIs REST",
    summary:
      "Organização de rotas, contratos e camadas de serviço: como manter uma API compreensível à medida que cresce.",
    topics: ["Contratos", "Camadas", "Versionamento"],
    provisional: true,
  },
  {
    id: "002",
    kind: "Tecnologia",
    status: "Em exploração",
    title: "Modelagem relacional com PostgreSQL",
    summary:
      "Normalização, integridade referencial e consultas que permanecem legíveis sem perder desempenho.",
    topics: ["Normalização", "Índices", "Consultas"],
    provisional: true,
  },
  {
    id: "003",
    kind: "Problema",
    status: "Em investigação",
    title: "Rotinas manuais entre serviços",
    summary:
      "Como integrar sistemas que não foram feitos para conversar, reduzindo tarefas repetitivas sem criar dependências frágeis.",
    topics: ["Integração", "Automação", "n8n"],
    provisional: true,
  },
  {
    id: "004",
    kind: "Experimento",
    status: "Em desenvolvimento",
    title: "Animação de interface com GSAP",
    summary:
      "Este portfólio: rolagem cinematográfica, revelações e parallax com GSAP e ScrollTrigger, priorizando transform e opacity para preservar a fluidez.",
    topics: ["GSAP", "ScrollTrigger", "Desempenho"],
  },
];
