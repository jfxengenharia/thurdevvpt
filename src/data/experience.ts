import type { ExperienceEntry } from "./types";

/**
 * Trajetória — ordem cronológica (mais antigo primeiro).
 *
 * As formações vêm da versão anterior do portfólio; os períodos ainda não
 * foram informados. A entrada de experiência profissional é um espaço
 * reservado e não descreve nenhum vínculo real.
 */
export const experience: ExperienceEntry[] = [
  {
    id: "tecnico",
    period: "Período a definir",
    kind: "Formação",
    title: "Técnico em Informática",
    institution: "Instituição a definir",
    description:
      "Formação técnica que deu início ao estudo de programação, redes e sistemas.",
    provisional: true,
  },
  {
    id: "ads",
    period: "Em curso",
    kind: "Formação",
    title: "Análise e Desenvolvimento de Sistemas",
    institution: "Instituição a definir",
    description:
      "Graduação tecnológica com ênfase em engenharia de software, bancos de dados e desenvolvimento de sistemas.",
    provisional: true,
  },
  {
    id: "experiencia-reservada",
    period: "A definir",
    kind: "Experiência",
    title: "Experiência profissional",
    institution: "Espaço reservado",
    description:
      "Registro reservado para experiências profissionais, estágios ou projetos com clientes.",
    provisional: true,
  },
  {
    id: "portfolio",
    period: "2026",
    kind: "Marco",
    title: "Academia · portfólio Cyber-Classical",
    institution: "Projeto pessoal",
    description:
      "Construção deste portfólio com React, TypeScript e GSAP: estudo de direção de arte, animação e arquitetura de interface.",
  },
];
