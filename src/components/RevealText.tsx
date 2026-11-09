import type { ElementType, ReactNode } from "react";

interface RevealTextProps {
  /** Texto com marcações: `*itálico*` e `\n` para quebra de linha. */
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Desative para controlar a animação manualmente (ex.: Hero). */
  reveal?: boolean;
}

interface Token {
  word: string;
  em: boolean;
}

function tokenize(line: string): Token[] {
  const tokens: Token[] = [];
  line.split(/(\*[^*]+\*)/g).forEach((segment) => {
    if (!segment) return;
    const em = segment.startsWith("*") && segment.endsWith("*");
    const clean = em ? segment.slice(1, -1) : segment;
    clean
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => tokens.push({ word, em }));
  });
  return tokens;
}

/**
 * Título com palavras individualmente mascaradas para animação tipográfica.
 * A estrutura é gerada pelo React (sem manipular o DOM depois da montagem);
 * leitores de tela recebem o texto completo via aria-label.
 */
export function RevealText({ text, as: Tag = "span", className, id, reveal = true }: RevealTextProps) {
  const plain = text.replace(/\*/g, "").replace(/\n/g, " ");
  const lines = text.split("\n");

  return (
    <Tag className={className} id={id} aria-label={plain} data-reveal={reveal ? "text" : undefined}>
      {lines.map((line, li) => (
        <span className="rv-line" key={li} aria-hidden="true">
          {tokenize(line).map((t, wi, arr) => {
            const content: ReactNode = t.em ? <em>{t.word}</em> : t.word;
            return (
              <span key={wi}>
                <span className="rv-word">
                  <span className="rv-inner">{content}</span>
                </span>
                {wi < arr.length - 1 ? " " : null}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
