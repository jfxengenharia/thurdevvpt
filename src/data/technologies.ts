import type { TechnologyShelf } from "./types";

/**
 * Biblioteca de tecnologias — cada categoria é uma estante.
 *
 * Fonte: ferramentas e stacks listadas na versão anterior do portfólio.
 * Não há indicação de nível de proficiência — apenas o contexto de uso conhecido.
 */
export const shelves: TechnologyShelf[] = [
  {
    id: "linguagens",
    category: "Linguagens",
    numeral: "I",
    description: "A gramática dos sistemas.",
    items: [
      { name: "JavaScript", context: "Fundamentos · lógica · assincronia" },
      { name: "TypeScript", context: "Tipagem · contratos · fundamentos" },
      { name: "SQL", context: "Consultas · modelagem relacional" },
    ],
  },
  {
    id: "frameworks",
    category: "Frameworks",
    numeral: "II",
    description: "Estruturas sobre as quais se constrói.",
    items: [
      { name: "Node.js", context: "Runtime · servidores · APIs REST" },
      { name: "Express", context: "Rotas · middlewares · APIs REST" },
      { name: "React", context: "Interfaces · componentes" },
    ],
  },
  {
    id: "bancos",
    category: "Bancos de dados",
    numeral: "III",
    description: "Onde a informação repousa.",
    items: [{ name: "PostgreSQL", context: "Modelagem · consultas · integridade" }],
  },
  {
    id: "ferramentas",
    category: "Ferramentas",
    numeral: "IV",
    description: "Instrumentos do ofício.",
    items: [
      { name: "Git", context: "Versionamento · histórico de decisões" },
      { name: "Postman", context: "Testes e documentação de APIs" },
      { name: "n8n", context: "Automação · integração entre serviços" },
    ],
  },
  {
    id: "infraestrutura",
    category: "Infraestrutura",
    numeral: "V",
    description: "O terreno onde tudo é executado.",
    items: [
      { name: "Linux", context: "Terminal · ambiente de servidor" },
      { name: "A definir", context: "Volume reservado para novas ferramentas de infraestrutura", provisional: true },
    ],
  },
];
