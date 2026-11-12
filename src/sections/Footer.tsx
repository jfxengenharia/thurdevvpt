import { personal, navigation } from "../data/personal";
import { scrollToTarget } from "../animations/smoothScroll";
import { Monogram } from "../components/Monogram";
import { artworkCredit } from "../data/artworks";

/**
 * Colofão — a última página do catálogo: monograma, ficha de composição,
 * índice e o "finis" que encerra a visita.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="colophon">
      <div className="container">
        <div className="colophon-rule" data-reveal="rule" data-origin="center center" aria-hidden="true" />

        <div className="colophon-grid">
          <div className="colophon-col">
            <span className="t-meta">Colofão</span>
            <p className="colophon-text">
              Composto em Oswald, Inter e JetBrains Mono. Construído com React, TypeScript, GSAP e Lenis;
              publicado no GitHub Pages.
            </p>
            <p className="colophon-text colophon-text--dim">{artworkCredit}</p>
            <p className="colophon-text colophon-text--dim">
              Capturas dos projetos feitas com cada sistema em execução, com dados de exemplo.
            </p>
            <p className="colophon-text colophon-text--dim">Atualizado em novembro de 2026.</p>
          </div>

          <div className="colophon-center">
            <Monogram className="colophon-monogram" />
            <p className="colophon-finis">Finis</p>
            <p className="t-mono">
              {personal.firstName} {personal.lastName} · {personal.role}
            </p>
          </div>

          <nav className="colophon-col colophon-index" aria-label="Índice do rodapé">
            <span className="t-meta">Índice</span>
            <ol>
              {navigation.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToTarget(`#${n.id}`);
                    }}
                  >
                    <span className="t-numeral">{n.numeral}</span> {n.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="colophon-base">
          <span className="t-mono">© {year} · {personal.location}</span>
          <button type="button" className="colophon-top t-meta" onClick={() => scrollToTarget(0)}>
            Voltar ao vestíbulo ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
