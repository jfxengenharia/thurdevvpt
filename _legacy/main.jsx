import React from "react";
import { createRoot } from "react-dom/client";
import { ArrowUpRight, Github, Linkedin, Mail, Terminal, Code2, Database, Server, ArrowDown, ExternalLink } from "lucide-react";
import "./styles.css";

const projects = [
  { id: "01", type: "BACKEND / API", title: "FLEET CONTROL", desc: "Plataforma de gestão de frotas com consulta de veículos, checklists e centralização de operações.", stack: "NODE.JS  ·  TYPESCRIPT  ·  POSTGRESQL", status: "EM DESENVOLVIMENTO" },
  { id: "02", type: "FULL STACK / DASHBOARD", title: "ENGINEERING HUB", desc: "Painel interno para organizar processos, indicadores e fluxos operacionais de engenharia.", stack: "REACT  ·  EXPRESS  ·  SQL", status: "CONCEITO" },
  { id: "03", type: "AUTOMATION / INTEGRATION", title: "WORKFLOW SYSTEM", desc: "Automação de rotinas e integração entre serviços para reduzir tarefas manuais.", stack: "TYPESCRIPT  ·  REST API  ·  N8N", status: "EXPERIMENTAL" }
];

function App() {
  return <main>
    <div className="noise" />
    <header className="topbar">
      <a className="brand" href="#top">ARTHUR<span>+</span></a>
      <nav><a href="#about">[ SOBRE ]</a><a href="#work">[ PROJETOS ]</a><a href="#stack">[ STACK ]</a><a href="#contact">[ CONTATO ]</a></nav>
      <span className="availability"><i /> DISPONÍVEL PARA OPORTUNIDADES</span>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy">
        <div className="eyebrow"><span className="blue-square"/> PORTFÓLIO PESSOAL — 2026</div>
        <h1>BUILDING<br/><em>DIGITAL</em><br/>SYSTEMS<span className="blue">.</span></h1>
        <div className="hero-bottom">
          <p>Desenvolvedor em formação, interessado em construir sistemas, APIs e soluções que funcionam por trás da experiência.</p>
          <a className="button" href="#work">EXPLORAR PROJETOS <ArrowDown size={15}/></a>
        </div>
      </div>
      <div className="hero-art">
        <div className="art-label top-label">FIG. 001 — HUMAN / MACHINE</div>
        <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
        <div className="crosshair c1">+</div><div className="crosshair c2">+</div>
        <div className="statue-wrap">
          <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=85" alt="Escultura clássica em composição artística" />
        </div>
        <div className="blue-panel"/>
        <div className="art-stamp">A<br/>R<br/>—<br/>01</div>
        <div className="art-caption">FIG. A / CLASSICAL FORM<br/>DIGITAL INTERPRETATION</div>
        <div className="coordinate">RECIFE, BR<br/>08°03' S / 34°52' W</div>
      </div>
      <div className="hero-index">01 <span>/</span> 04</div>
    </section>

    <section className="ticker"><span>BACKEND DEVELOPMENT</span><b>✳</b><span>SOFTWARE ENGINEERING</span><b>✳</b><span>BUILD · TEST · IMPROVE</span><b>✳</b><span>BACKEND DEVELOPMENT</span></section>

    <section className="about section" id="about">
      <div className="section-head"><span>01 / SOBRE</span><span className="mono">PROFILE & INTENTION</span></div>
      <div className="about-grid">
        <h2>Curiosity<br/>into <i>systems.</i></h2>
        <div className="about-text"><p className="lead">Sou Arthur, técnico de informática e estudante de Análise e Desenvolvimento de Sistemas.</p><p>Meu foco é desenvolvimento backend: compreender problemas, projetar estruturas e transformar ideias em aplicações confiáveis. Gosto de tecnologia, integração entre serviços e automação de processos.</p><a className="text-link" href="#contact">MAIS SOBRE MIM <ArrowUpRight size={15}/></a></div>
      </div>
    </section>

    <section className="work section" id="work">
      <div className="section-head"><span>02 / PROJETOS SELECIONADOS</span><span className="mono">SELECTED WORK — 2025/26</span></div>
      <div className="work-intro"><h2>Selected<br/><i>works.</i></h2><p>Projetos, experimentos e sistemas<br/>em construção.</p></div>
      <div className="project-list">{projects.map(p => <article className="project" key={p.id}>
        <div className="project-id">{p.id}</div><div className="project-main"><span className="project-type">{p.type}</span><h3>{p.title}</h3><p>{p.desc}</p><div className="stack-line">{p.stack}</div></div>
        <div className="project-meta"><span>{p.status}</span><a href="#contact" aria-label={"Saiba mais sobre " + p.title}><ArrowUpRight/></a></div>
      </article>)}</div>
    </section>

    <section className="stack-section section" id="stack">
      <div className="section-head"><span>03 / FERRAMENTAS</span><span className="mono">CURRENT TOOLKIT</span></div>
      <div className="stack-layout"><h2>Tools for<br/><i>the work.</i></h2><div className="tool-grid">
        <div className="tool"><Code2/><span>LANGUAGES</span><strong>JavaScript / TypeScript</strong><small>Fundamentos · Tipagem · Lógica</small></div>
        <div className="tool"><Server/><span>RUNTIME</span><strong>Node.js / Express</strong><small>APIs REST · Servidores</small></div>
        <div className="tool"><Database/><span>DATA</span><strong>SQL / PostgreSQL</strong><small>Modelagem · Consultas</small></div>
        <div className="tool"><Terminal/><span>WORKFLOW</span><strong>Git / Linux / Postman</strong><small>Versionamento · Testes</small></div>
      </div></div>
    </section>

    <section className="contact section" id="contact">
      <div className="section-head"><span>04 / CONTATO</span><span className="mono">START A CONVERSATION</span></div>
      <div className="contact-main"><div><span className="eyebrow"><span className="blue-square"/> OPEN TO WORK & COLLABORATION</span><h2>LET'S BUILD<br/><i>something.</i></h2></div><a className="contact-arrow" href="mailto:seuemail@email.com"><ArrowUpRight size={44}/></a></div>
      <div className="contact-links"><a href="mailto:seuemail@email.com"><Mail/> EMAIL</a><a href="https://github.com/"><Github/> GITHUB</a><a href="https://linkedin.com/"><Linkedin/> LINKEDIN</a></div>
    </section>
    <footer><span>© 2026 ARTHUR — PORTFÓLIO</span><span>DESIGNED & DEVELOPED WITH INTENTION</span><a href="#top">BACK TO TOP ↑</a></footer>
  </main>;
}

createRoot(document.getElementById("root")).render(<App />);