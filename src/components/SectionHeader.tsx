import { RevealText } from "./RevealText";

interface SectionHeaderProps {
  numeral: string;
  label: string;
  /** Linha técnica à direita — ex.: "Sala II / VI". */
  meta: string;
  kicker?: string;
  /** Título com marcações de RevealText (`*itálico*`, `\n`). */
  title: string;
  intro?: string;
  id?: string;
}

/** Cabeçalho editorial numerado, comum a todas as salas da galeria. */
export function SectionHeader({ numeral, label, meta, kicker, title, intro, id }: SectionHeaderProps) {
  return (
    <header className="sh">
      <div className="sh-rule-row">
        <span className="t-numeral sh-numeral">{numeral}</span>
        <span className="t-meta sh-label">{label}</span>
        <span className="sh-rule" data-reveal="rule" aria-hidden="true" />
        <span className="t-mono sh-meta">{meta}</span>
      </div>
      <div className="sh-body">
        {kicker && (
          <p className="t-meta sh-kicker" data-reveal="fade">
            {kicker}
          </p>
        )}
        <RevealText as="h2" className="t-h2 sh-title" text={title} id={id} />
        {intro && (
          <p className="t-body sh-intro" data-reveal="fade">
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}
