import type { ExperienceEntry } from "./types";

/**
 * Trajetória — ordem cronológica (mais antigo primeiro).
 *
 * Informado pelo autor: técnico em informática (help desk) na Lampejo
 * Entretenimento de janeiro a maio de 2025, ADS na Uninassau Recife (polo
 * Boa Viagem), JFX Engenharia de janeiro a novembro de 2026 e a Summer IA
 * como projeto pessoal.
 */
export const experience: ExperienceEntry[] = [
  {
    id: "tecnico",
    period: "01.25 — 05.25",
    kind: "Experiência",
    title: "Técnico em Informática",
    institution: "Lampejo Entretenimento",
    description: "Suporte de TI e help desk: atendimento aos usuários e resolução dos problemas de informática do dia a dia.",
  },
  {
    id: "ads",
    period: "Em curso",
    kind: "Formação",
    title: "Análise e Desenvolvimento de Sistemas",
    institution: "Uninassau Recife · polo Boa Viagem",
    description:
      "Graduação tecnológica com ênfase em engenharia de software, bancos de dados e desenvolvimento de sistemas.",
  },
  {
    id: "jfx-engenharia",
    period: "01.26 — 11.26",
    kind: "Experiência",
    title: "JFX Engenharia",
    institution: "Experiência profissional",
    description: "Experiência profissional de janeiro a novembro de 2026.",
  },
  {
    id: "summer-ia",
    period: "2026",
    kind: "Marco",
    title: "Summer IA",
    institution: "Projeto pessoal",
    description:
      "Agente de IA que ensina programação executando tarefas reais: lê arquivos, escreve e roda código e navega na web. Núcleo em Python com FastAPI, memória de sessão e camada de segurança própria.",
  },
];
