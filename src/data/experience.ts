import type { ExperienceEntry } from "./types";

/**
 * Trajetória — ordem cronológica (mais antigo primeiro).
 *
 * Informado pelo autor: técnico em informática como experiência, ADS na
 * Uninassau Recife (polo Boa Viagem), JFX Engenharia de janeiro a novembro
 * de 2026 e a Summer IA como projeto pessoal. Técnico em informática de
 * janeiro de 2026 até hoje (local não informado).
 */

/** Mês e ano no formato da linha do tempo: janeiro de 2026 → "01.26". */
function monthYear(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${month}.${year}`;
}

/**
 * Período em andamento: o fim é o mês atual de quem visita, calculado no
 * navegador — em janeiro de 2027 passa a mostrar "01.26 — 01.27" sozinho.
 */
function ongoingSince(start: string): string {
  return `${start} — ${monthYear(new Date())}`;
}

export const experience: ExperienceEntry[] = [
  {
    id: "tecnico",
    period: ongoingSince("01.26"),
    kind: "Experiência",
    title: "Técnico em Informática",
    institution: "Experiência profissional",
    description: "Atuação como técnico em informática.",
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
