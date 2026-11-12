import type { Project } from "./types";
import summerScreen from "../assets/screens/summer-ia.webp";
import bimScreen from "../assets/screens/bim-eletrico.webp";
import acompResumoScreen from "../assets/screens/acompanhamento-resumo.webp";
import acompFinancasScreen from "../assets/screens/acompanhamento-financas.webp";

/**
 * Projetos, apresentados como obras da exposição.
 *
 * Fonte: repositórios públicos de github.com/thurdevv (README de cada projeto).
 * Por decisão do autor, Drizzle e Vite não são listados nas stacks.
 *
 * A obra de cada projeto é a captura do próprio sistema (`screens[0]`, exibida
 * na moldura); as demais capturas aparecem na ficha técnica. Foram feitas com
 * cada sistema rodando a partir do próprio repositório (nov. 2026); os dados
 * que aparecem nelas são fictícios, criados só para a captura.
 */
export const projects: Project[] = [
  {
    id: "summer-ia",
    inventory: "Inv. 001",
    title: "Summer IA",
    category: "IA · Agente autônomo",
    year: "2026",
    status: "Em desenvolvimento",
    summary:
      "Agente de IA que ensina programação executando tarefas reais: lê arquivos, escreve e roda código, navega na web.",
    description:
      "A Summer não é um chatbot: é um agente que decide, executa, observa o resultado e escolhe o próximo passo. Tem 27 ferramentas em 7 categorias (arquivos, busca em código, inspeção, execução de Python e shell, web, fontes externas como GitHub e PyPI, e navegador autônomo), três personas nativas (engenheira sênior, mentora e autônoma) e personas customizáveis em YAML.",
    objective:
      "Ensinar programação na prática: em vez de só explicar um conceito, o agente cria o código, executa e mostra o resultado, mantendo memória da conversa para continuar a partir do que já foi feito.",
    architecture:
      "Núcleo em Python com loop agentic, executor de ferramentas, memória de sessão e camada de segurança em sete etapas (filtro de ferramentas, validação de argumentos, caminhos protegidos, aprovação humana para execução de código, bloqueio de comandos destrutivos e de segredos, proteção anti-SSRF e subprocessos isolados com timeout). Usa Gemini como modelo principal com fallback automático para Groq. Duas interfaces: CLI no terminal e GUI web com FastAPI e WebSocket.",
    technologies: ["Python", "FastAPI", "WebSocket", "Gemini", "Groq", "Playwright", "Pydantic"],
    links: [{ label: "Repositório", href: "https://github.com/thurdevv/summerAgent" }],
    screens: [
      {
        src: summerScreen,
        alt: "Interface web da Summer IA: conversa com plano de execução em etapas, arquivos criados, editor de código e terminal.",
        caption: "Interface web · plano de execução, editor e terminal",
      },
    ],
  },
  {
    id: "bim-eletrico",
    inventory: "Inv. 002",
    title: "BIM Elétrico",
    category: "Full stack · Engenharia",
    year: "2026",
    status: "Publicado",
    summary:
      "Acompanhamento de instalações elétricas sobre modelos BIM em 3D no navegador, com uso offline em obra.",
    description:
      "O técnico em campo carrega um modelo BIM (IFC ou XKT), toca em um elemento e registra o progresso: status, quantidade executada, equipe, horas, checklist, observações e foto. O sistema calcula o avanço por pavimento e por tipo de instalação e gera relatório.",
    objective:
      "Levar o acompanhamento de obra para o modelo 3D e funcionar mesmo sem internet no canteiro, sincronizando os dados entre dispositivos quando a conexão volta.",
    architecture:
      "PWA offline-first: Postgres como fonte de verdade, cache local de leitura e fila de escrita (outbox) com envio em lote, reenvio individual quando um registro falha e dead-letter após cinco tentativas. Conflitos resolvidos por last-write-wins. Autenticação por sessão com cookie assinado (HMAC-SHA256), senhas com bcrypt e autorização por projeto (membro e dono). Visualizador 3D com xeokit e leitura de IFC via WebAssembly.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "xeokit", "WebAssembly", "Vitest"],
    links: [
      { label: "Ver online", href: "https://dashboardeletrica.vercel.app" },
      { label: "Repositório", href: "https://github.com/thurdevv/dashboard_eletrica" },
    ],
    screens: [
      {
        src: bimScreen,
        alt: "BIM Elétrico com um modelo IFC de residência carregado no visualizador 3D, filtros por status e lista de pavimentos.",
        caption: "Visualizador 3D · modelo IFC de exemplo com 108 elementos",
      },
    ],
  },
  {
    id: "acompanhamento-pessoal",
    inventory: "Inv. 003",
    title: "Acompanhamento Pessoal",
    category: "Full stack · API REST",
    year: "2026",
    status: "Em desenvolvimento",
    summary:
      "Sistema de acompanhamento pessoal com quatro áreas: saúde, finanças, estudos e projetos.",
    description:
      "Reúne em um só lugar o registro de saúde (água, sono e alimentação), finanças (receitas, despesas, categorias, metas e investimentos), estudos (cartões personalizáveis) e projetos de programação com tarefas. Os indicadores são apresentados como números e percentuais em texto, sem gráficos.",
    objective:
      "Centralizar a rotina pessoal em uma ferramenta simples, responsiva e acessível também pelo celular.",
    architecture:
      "Monorepo com cliente em React e API REST em Node.js com Express, separada por domínio (saúde, finanças, estudos, projetos). Banco PostgreSQL com schema criado automaticamente na inicialização da API. Deploy por blueprint no Render: banco gerenciado, serviço da API com CORS restrito ao frontend e site estático.",
    technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Render"],
    links: [{ label: "Repositório", href: "https://github.com/thurdevv/acompanhamento" }],
    screens: [
      {
        src: acompResumoScreen,
        alt: "Tela de resumo do Acompanhamento Pessoal: água, sono, saldo do mês, projetos e estudos em andamento.",
        caption: "Resumo · saúde, finanças, estudos e projetos",
      },
      {
        src: acompFinancasScreen,
        alt: "Tela de finanças do Acompanhamento Pessoal: receitas, despesas, saldo, transações e gastos por categoria.",
        caption: "Finanças · transações e gastos por categoria",
      },
    ],
  },
];
