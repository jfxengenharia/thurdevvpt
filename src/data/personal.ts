import type { NavItem, Personal } from "./types";
import { artworks } from "./artworks";

/**
 * Informações pessoais.
 *
 * Fonte: versão anterior do portfólio (nome, formação, foco em backend,
 * Recife e coordenadas). O sobrenome "Plácido" foi inferido a partir do brasão
 * da família Plácido — confirme ou ajuste aqui.
 * Campos com `provisional: true` aguardam o conteúdo definitivo.
 */
export const personal: Personal = {
  firstName: "Arthur",
  lastName: "Plácido",
  monogram: "AP",
  role: "Desenvolvimento backend",
  disciplines: ["Sistemas", "APIs", "Integrações", "Pesquisa"],
  location: "Recife, Pernambuco, Brasil",
  coordinates: "08°03′ S · 34°52′ O",
  heroIntro:
    "Técnico em informática e estudante de Análise e Desenvolvimento de Sistemas. Estudo e construo sistemas, APIs e integrações: a parte do software que sustenta a experiência.",
  heroArtwork: artworks.apolo,
  about: {
    lead: "Meu foco é o desenvolvimento backend: compreender problemas, projetar estruturas e transformar ideias em aplicações confiáveis.",
    paragraphs: [
      "Interesso-me pela engenharia que fica por trás da interface: a modelagem dos dados, os contratos entre serviços e a automação de processos que hoje dependem de trabalho manual.",
      "Trato cada projeto como objeto de estudo: entender o problema antes da ferramenta, documentar as decisões e revisar o que foi construído.",
    ],
    trajectory: {
      text: "Resumo da trajetória a ser escrito: origem do interesse por tecnologia, momentos de virada e direção atual.",
      provisional: true,
    },
    fields: [
      { label: "Formação", value: ["Técnico em Informática", "Análise e Desenvolvimento de Sistemas (em curso)"] },
      { label: "Base", value: "Recife, PE, Brasil" },
      { label: "Foco", value: "Desenvolvimento backend" },
      {
        label: "Interesses",
        value: ["Integração entre serviços", "Automação de processos", "Arquitetura de APIs"],
      },
      {
        label: "Especialidades",
        value: ["A definir"],
        provisional: true,
      },
      {
        label: "Conhecimentos",
        value: ["APIs REST", "Modelagem de dados", "Tipagem com TypeScript", "Versionamento com Git"],
      },
      {
        label: "Áreas de estudo",
        value: ["Engenharia de software", "Bancos de dados relacionais", "Arquitetura de sistemas"],
        provisional: true,
      },
    ],
  },
  contact: {
    message:
      "Para conversas sobre projetos, colaborações ou oportunidades, o caminho mais direto é o e-mail. Respondo com atenção a cada mensagem.",
    email: { address: "arthurdeventerprise@gmail.com" },
    links: [
      { label: "GitHub", href: "https://github.com/", handle: "github.com/…", provisional: true },
      { label: "LinkedIn", href: "https://linkedin.com/", handle: "linkedin.com/in/…", provisional: true },
    ],
  },
  edition: "MMXXVI",
};

export const navigation: NavItem[] = [
  { id: "sobre", numeral: "I", label: "Sobre" },
  { id: "obras", numeral: "II", label: "Obras" },
  { id: "biblioteca", numeral: "III", label: "Biblioteca" },
  { id: "trajetoria", numeral: "IV", label: "Trajetória" },
  { id: "pesquisa", numeral: "V", label: "Pesquisa" },
  { id: "contato", numeral: "VI", label: "Contato" },
];
