# CONTEXTO — Portfólio Cyber-Classical

> Atualizado em 12/11/2026 · versionado em Git, publicado no GitHub Pages
> Leia este arquivo antes de mexer no projeto — ou entregue-o a qualquer IA/dev como ponto de partida.

---

## 1. O que é

Portfólio pessoal de **Arthur Plácido** (desenvolvimento backend), construído como uma
**galeria acadêmica digital**: arte clássica (Grécia, Roma, Renascimento) reinterpretada por
um engenheiro de software. Proporção conceitual: **70% clássico / 30% tecnológico**.

Página única, vertical, em PT-BR. Sem tema claro, sem trilha sonora, sem outros idiomas.

## 2. Fontes de verdade (ordem de prioridade)

1. **`style.md`** — direção visual principal do portfólio (paleta, tipografia, seções,
   materiais, animação, restrições). **Sempre consultar antes de qualquer mudança visual.**
2. **`docs/nous-visual-system.md`** — sistema visual da Nous Research (Cyber-Classical),
   usado como **tratamento artístico** dentro do que o `style.md` define.
   Cópia fiel de <https://github.com/magnus919/agent-skills/blob/main/nous-branding/references/visual-system.md>.
   **Nunca editar este arquivo.**
3. Decisões tomadas depois do `style.md` (seção 5 abaixo) — prevalecem onde conflitam.

### Como os dois documentos convivem
| Vem do `style.md` | Vem da Nous |
|---|---|
| Paleta `#0B0B10` (fundo) · `#6D4AA8` (roxo, destaque) · `#E6E6E6` (texto) | Fotomontagem: obra clássica + camada técnica digital por cima |
| Títulos serifados dramáticos, texto sans, metadados em caixa alta | Chiaroscuro de alto contraste |
| Estrutura de galeria, seções numeradas, molduras de museu | Texturas analógicas: halftone, ruído de fotocópia, scan lines, fibra de papel |
| Materiais clássicos no fundo (pedra, mármore, papel) | Linhas HUD dourado/laranja (`#E6C666`, `#D6825A`) — **só como traço sobre obras, nunca como cor de UI** |
| Pinturas com cores envelhecidas, predominando sobre o tech | "Nunca liso, nunca corporativo" |

## 3. Como rodar

Requisitos: Node 18+ (testado com Node 24).

```bash
npm install        # primeira vez (o zip vem sem node_modules)
npm run dev        # http://localhost:5173
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o build
npm run typecheck  # só os tipos
```

Se a porta 5173 estiver ocupada (ex.: outro projeto Vite), o Vite usa a próxima (5174…).

**Publicação:** todo push na `main` dispara `.github/workflows/deploy.yml` (build + GitHub
Pages). Endereço: <https://jfxengenharia.github.io/thurdevvpt/>. O `base: "./"` do
`vite.config.ts` mantém os caminhos relativos para funcionar na subpasta do repositório.

**Stack:** React 18 · TypeScript · Vite 6 · GSAP 3 + ScrollTrigger · Lenis (rolagem suave).
Sem outras bibliotecas de UI. Ícones são SVGs próprios (`components/Icon.tsx`).

## 4. Estrutura

```
src/
  data/            ← TODO o conteúdo. Editar aqui, não nos componentes.
    personal.ts      nome, intro, ficha acadêmica, contato, navegação
    projects.ts      projetos (obras da exposição)
    experience.ts    linha do tempo
    technologies.ts  biblioteca (estantes por categoria)
    artworks.ts      acervo de pinturas + etiquetas de museu + pintura do Hero
    types.ts         tipos de todo o conteúdo
  sections/        Hero, About, Projects, Library, Timeline, Contact, Footer
  components/      Navbar, Frame (moldura), Study (desenhos técnicos SVG), PaintingHud,
                   Exhibit/ExhibitDetail (obra + ficha expansível), Bookshelf,
                   RevealText, SectionHeader, Monogram, Provisional…
  animations/
    gsap.ts          registro de plugins, media queries (MQ), curvas (EASE)
    smoothScroll.ts  Lenis sincronizado ao ticker do GSAP; scrollToTarget()
    reveals.ts       revelações declarativas via data-attributes (ver abaixo)
    useScene.ts      hook: cena GSAP com limpeza automática (gsap.matchMedia)
  styles/          tokens.css (cores/fontes/texturas) + um CSS por área
  assets/
    artworks/        pinturas em WebP (otimizadas)
    screens/         capturas dos sistemas em execução (ficha técnica dos projetos)
    textures/        texturas SVG procedurais (grain, photocopy, fiber, marble, stone)
    fonts/           karstar-free.ttf (monograma)
public/favicon.svg
_legacy/           versão antiga do portfólio (JSX), só referência
docs/              cópia intocada do guia Nous
style.md           direção visual (fonte de verdade)
```

### Sistema de animação declarativo (`animations/reveals.ts`)
Os componentes só marcam elementos; a animação é criada em um lugar só:

| Atributo | Efeito |
|---|---|
| `data-reveal="text"` | palavras sobem por trás de máscara (usado pelo `RevealText`) |
| `data-reveal="fade"` | entrada suave de baixo para cima |
| `data-reveal="rule"` | linha editorial desenhada (`data-origin` define a origem) |
| `data-reveal="clip"` | máscara de revelação das obras |
| `data-zoom="1.2"` | zoom progressivo atrelado à rolagem |
| `data-parallax="0.1"` | parallax |
| `data-draw` + `.draw` | traços SVG desenhados na entrada |
| `.section-light` | transição de iluminação entre seções |

Regras: animar só `transform`, `opacity` e `clip-path`; `prefers-reduced-motion` desliga
Lenis e animações (conteúdo aparece direto); pin da câmera do Hero só no desktop.

O pin do Hero desloca tudo o que vem abaixo e por isso tem `refreshPriority: 1`: é medido
antes dos demais ScrollTriggers. Qualquer outro pin novo precisa do mesmo cuidado (ou ser
criado antes dos gatilhos das seções seguintes).

## 5. Decisões tomadas (histórico)

| # | Decisão | Motivo |
|---|---|---|
| 1 | Estrutura de "galeria": seções = salas (Sala 0 Vestíbulo → Sala V Correspondência) | `style.md` §7 |
| 2 | **Brasão Plácido removido de todo o site** (navbar, sobre, rodapé, favicon) | Pedido do usuário. Contraria o `style.md` §8 — **não reintroduzir sem perguntar** |
| 3 | Monograma **"AP" em Karstar**, sem separador | Pedido do usuário |
| 4 | **Pinturas renascentistas reais** (domínio público) no lugar de placeholders | Pedido do usuário: "pinturas renascentistas misturando Grécia + Roma" |
| 5 | Hero = *A Escola de Atenas* ocupando a tela + quadro com a estátua de Apolo (detalhe do afresco) | Grécia (filósofos) + Roma (arquitetura); `style.md` §7 |
| 6 | HUD do Hero só com linhas de perspectiva (ortogonais + horizonte) | Rótulos "Platão", "Aristóteles" e "Ponto de fuga" removidos a pedido |
| 7 | Desenhos técnicos (`Study`) sobrepostos às obras como camada HUD | Fotomontagem Nous |
| 8 | Fundo das seções com textura de pedra + ruído (não cor lisa) | `style.md` §5 |
| 9 | Sobrenome "Plácido" no nome | **Inferido** do brasão da família — confirmar |
| 10 | Títulos e destaques em **Oswald** (sans condensada, sem itálico), no lugar da serifada do `style.md` §6 | Decisão posterior ao `style.md` (commit `9ab0052`). A variável CSS continua se chamando `--serif` e os `font-style: italic` ficaram sem efeito |
| 11 | **Seção Pesquisa ("Caderno de investigações") removida**; as salas passaram a ser I–V | Pedido do usuário (12/11/2026) |
| 12 | Sem "Edição MMXXVI" em lugar nenhum (Hero, navbar, rodapé) nem localização acima do nome | Pedido do usuário |
| 13 | Capturas dos sistemas ficam na ficha técnica ("Registro"), não no lugar das pinturas | Mantém a proporção 70% clássico / 30% tech. Feitas rodando cada repositório com dados fictícios |

### Acervo atual (`src/data/artworks.ts`)
| Onde | Obra |
|---|---|
| Hero (fundo) | Rafael — *A Escola de Atenas* (1509–1511), Vaticano |
| Hero (quadro) | Apolo — detalhe da *Escola de Atenas* |
| Summer IA | Botticelli — *O Nascimento de Vênus* (c. 1485), Uffizi |
| BIM Elétrico | Rafael — *O Triunfo de Galateia* (c. 1512), Villa Farnesina |
| Acompanhamento Pessoal | Ticiano — *Baco e Ariadne* (1520–1523), National Gallery |
| Sobre | Leonardo — *Homem Vitruviano* (c. 1490), Gallerie dell'Accademia |

Para trocar uma obra: substituir o arquivo em `assets/artworks/` e a etiqueta em `artworks.ts`.
A legenda do desenho técnico sobre a obra usa o mesmo número da placa (`plate`).

## 6. Pendências de conteúdo (marcadas na tela como "Provisório" / "A documentar")

- [ ] Confirmar sobrenome **Plácido** (`personal.ts`)
- [x] E-mail real
- [x] URL do GitHub
- [ ] URL do LinkedIn (hoje aponta para `linkedin.com`, marcado como provisório)
- [x] Texto do perfil (Sobre); o bloco "Trajetória" do Sobre foi removido
- [x] Especialidades e áreas de estudo (ficha acadêmica)
- [ ] Período e local da atuação como técnico em informática (`experience.ts`)
- [ ] Cargo e atividades na JFX Engenharia (hoje só empresa e período)
- [x] Objetivo, arquitetura, ano e links dos 3 projetos (`projects.ts`)
- [x] Capturas dos projetos (na ficha técnica; as obras continuam sendo pinturas)
- [ ] Biblioteca (`technologies.ts`) ainda reflete a versão anterior: não lista Python,
      FastAPI, Next.js e outras tecnologias que aparecem nos projetos
- [ ] O campo `year` dos projetos existe nos dados mas não é exibido em lugar nenhum
- [ ] Imagem e metadados de compartilhamento (Open Graph)

Regra: **não inventar** informações pessoais, links ou resultados. O que não for conhecido
fica marcado com `provisional: true` (aparece com a etiqueta "Provisório").

## 7. Licenças e créditos

- **Pinturas:** domínio público, reproduções via Wikimedia Commons. Crédito no colofão.
- **Karstar** (MaulanaCreative, via DaFont): **gratuita apenas para uso pessoal**.
  Se o site virar uso comercial, comprar licença ou trocar a fonte (`styles/typography.css`).
- **Oswald, Inter, JetBrains Mono:** Google Fonts (OFL). Só os pesos em uso são pedidos
  no `index.html` (Inter 300/400/500, JetBrains Mono 400/500).

## 8. Notas técnicas / conhecidas

- O TypeScript instalado é a 7.x; `tsc --noEmit` funciona normalmente.
- A meta de **120 FPS** não pôde ser medida no ambiente de teste (navegador headless limitado
  a 30 FPS). Conferir no navegador real; se travar, os primeiros suspeitos são o `filter` CSS
  das pinturas e o grão fixo de tela (`.grain-overlay`).
- `useScene` + `gsap.matchMedia` limpam todos os ScrollTriggers ao desmontar — manter esse
  padrão em animações novas.
- `node_modules/` e `dist/` ficam fora do Git (são recriados com `npm install` /
  `npm run build`).
- No desktop o Hero ocupa uma tela (mín. 680px). O nome é dimensionado **só pela largura**
  (`.t-display`): limitar pela altura encolhia o nome pela metade em notebooks e foi
  revertido a pedido. Em telas com até 800px de altura o rodapé do Hero (convite à rolagem e
  crédito) é ocultado para não cobrir os botões. Ao mudar o Hero, conferir em 1536×730,
  1366×657 e 1920×937.
