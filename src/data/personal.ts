import type { NavItem, Personal } from "./types";
import { artworks } from "./artworks";

/**
 * Informações pessoais.
 *
 * Fonte: versão anterior do portfólio (nome, foco em backend, Recife e
 * coordenadas) e informações passadas pelo autor (perfil e ficha acadêmica). O sobrenome "Plácido" foi inferido a partir do brasão
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
    lead: "Trabalho com desenvolvimento backend e me interesso justamente pelo que acontece nos bastidores de uma aplicação: a modelagem dos dados, os contratos entre serviços e a automação daquelas tarefas manuais que travam a operação.",
    paragraphs: [
      "Encaro cada projeto de forma bem prática — primeiro entendo o problema real, depois escolho a ferramenta. Também faço questão de documentar o porquê das decisões técnicas e revisar o que foi feito para entregar algo sólido.",
    ],
    fields: [
      {
        label: "Formação",
        value: ["Análise e Desenvolvimento de Sistemas (em curso)", "Uninassau Recife · polo Boa Viagem"],
      },
      { label: "Base", value: "Recife, PE, Brasil" },
      { label: "Foco", value: "Desenvolvimento backend" },
      {
        label: "Interesses",
        value: ["Integração entre serviços", "Automação de processos", "Arquitetura de APIs"],
      },
      {
        label: "Especialidades",
        value: ["Java", "Python", "TypeScript"],
      },
      {
        label: "Conhecimentos",
        value: ["APIs REST", "Modelagem de dados", "Tipagem com TypeScript", "Versionamento com Git"],
      },
      {
        label: "Áreas de estudo",
        value: ["Análise e Desenvolvimento de Sistemas", "Engenharia de software"],
      },
    ],
  },
  contact: {
    message:
      "Para conversas sobre projetos, colaborações ou oportunidades, o caminho mais direto é o e-mail. Respondo com atenção a cada mensagem.",
    email: { address: "arthurdeventerprise@gmail.com" },
    links: [
      { label: "GitHub", href: "https://github.com/thurdevv", handle: "github.com/thurdevv" },
      { label: "LinkedIn", href: "https://linkedin.com/", handle: "linkedin.com/in/…", provisional: true },
    ],
  },
};

export const navigation: NavItem[] = [
  { id: "sobre", numeral: "I", label: "Sobre" },
  { id: "obras", numeral: "II", label: "Obras" },
  { id: "biblioteca", numeral: "III", label: "Biblioteca" },
  { id: "trajetoria", numeral: "IV", label: "Trajetória" },
  { id: "contato", numeral: "V", label: "Contato" },
];
