import type { Project } from "./types";
import { artworks } from "./artworks";

/**
 * Projetos — apresentados como obras da exposição.
 *
 * Fonte: versão anterior do portfólio (título, categoria, descrição, stack e status).
 * Objetivo, arquitetura, ano e links ainda não foram documentados e estão
 * marcados em `pendingFields`; nenhum link foi inventado.
 *
 * As obras de cada projeto vêm de `artworks.ts` (substitua por imagens do projeto quando houver).
 */
export const projects: Project[] = [
  {
    id: "fleet-control",
    inventory: "Inv. 001",
    title: "Fleet Control",
    category: "Backend · API",
    year: "A definir",
    status: "Em desenvolvimento",
    summary:
      "Plataforma de gestão de frotas com consulta de veículos, checklists e centralização de operações.",
    description:
      "Plataforma de gestão de frotas com consulta de veículos, checklists e centralização de operações em um único sistema.",
    objective: "A documentar.",
    architecture: "A documentar.",
    technologies: ["Node.js", "TypeScript", "PostgreSQL"],
    links: [],
    pendingFields: ["objective", "architecture", "links", "year"],
    artwork: artworks.venus,
  },
  {
    id: "engineering-hub",
    inventory: "Inv. 002",
    title: "Engineering Hub",
    category: "Full stack · Painel interno",
    year: "A definir",
    status: "Conceito",
    summary:
      "Painel interno para organizar processos, indicadores e fluxos operacionais de engenharia.",
    description:
      "Painel interno para organizar processos, indicadores e fluxos operacionais de engenharia.",
    objective: "A documentar.",
    architecture: "A documentar.",
    technologies: ["React", "Express", "SQL"],
    links: [],
    pendingFields: ["objective", "architecture", "links", "year"],
    artwork: artworks.galateia,
  },
  {
    id: "workflow-system",
    inventory: "Inv. 003",
    title: "Workflow System",
    category: "Automação · Integração",
    year: "A definir",
    status: "Experimental",
    summary:
      "Automação de rotinas e integração entre serviços para reduzir tarefas manuais.",
    description:
      "Automação de rotinas e integração entre serviços para reduzir tarefas manuais.",
    objective: "A documentar.",
    architecture: "A documentar.",
    technologies: ["TypeScript", "REST API", "n8n"],
    links: [],
    pendingFields: ["objective", "architecture", "links", "year"],
    artwork: artworks.baco,
  },
];
