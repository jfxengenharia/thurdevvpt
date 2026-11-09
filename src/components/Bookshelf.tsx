import type { CSSProperties } from "react";
import type { Technology, TechnologyShelf } from "../data/types";

interface BookshelfProps {
  shelf: TechnologyShelf;
  activeKey: string;
  onSelect: (key: string) => void;
}

/** Couros envelhecidos — tons dessaturados para não competir com a interface. */
const LEATHERS = ["#3b1f1d", "#1f2a24", "#232036", "#2d2116", "#2a1f33", "#1b232c", "#352a1b"];

/** Variação determinística (mesmo livro, mesma aparência a cada renderização). */
function hash(text: string): number {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return h;
}

export function bookKey(shelf: TechnologyShelf, tech: Technology): string {
  return `${shelf.id}:${tech.name}`;
}

function bookStyle(seed: string, label: string): CSSProperties {
  const h = hash(seed);
  return {
    "--leather": LEATHERS[h % LEATHERS.length],
    "--book-h": `${82 + (h % 17)}%`,
    "--book-w": `${Math.max(46, Math.min(68, 30 + label.length * 3.6))}px`,
  } as CSSProperties;
}

/** Volumes decorativos sem título, para a estante parecer habitada. */
function Filler({ seed, count }: { seed: string; count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const h = hash(`${seed}-${i}`);
        const style = {
          "--leather": LEATHERS[(h >> 3) % LEATHERS.length],
          "--book-h": `${68 + (h % 22)}%`,
          "--book-w": `${18 + (h % 16)}px`,
        } as CSSProperties;
        return <span key={i} className="book book--filler" style={style} aria-hidden="true" />;
      })}
    </>
  );
}

export function Bookshelf({ shelf, activeKey, onSelect }: BookshelfProps) {
  return (
    <div className="shelf" data-reveal="fade">
      <div className="shelf-label">
        <span className="t-numeral shelf-numeral">{shelf.numeral}</span>
        <div>
          <h3 className="shelf-title">{shelf.category}</h3>
          <p className="shelf-desc">{shelf.description}</p>
        </div>
      </div>

      <div className="shelf-case">
        <div className="shelf-books" role="list">
          <Filler seed={`${shelf.id}-a`} count={2} />
          {shelf.items.map((tech, i) => {
            const key = bookKey(shelf, tech);
            const active = key === activeKey;
            return (
              <button
                key={tech.name}
                type="button"
                role="listitem"
                className={`book${active ? " is-active" : ""}${tech.provisional ? " book--reserved" : ""}`}
                style={bookStyle(key, tech.name)}
                onMouseEnter={() => onSelect(key)}
                onFocus={() => onSelect(key)}
                onClick={() => onSelect(key)}
                aria-pressed={active}
                aria-label={`${tech.name}: ${tech.context}`}
              >
                <span className="book-band book-band--top" aria-hidden="true" />
                <span className="book-title">{tech.name}</span>
                <span className="book-vol" aria-hidden="true">
                  {shelf.numeral}·{i + 1}
                </span>
                <span className="book-band book-band--bottom" aria-hidden="true" />
              </button>
            );
          })}
          <Filler seed={`${shelf.id}-b`} count={3} />
          <span className="book-lean" aria-hidden="true" />
        </div>
        <div className="shelf-plank" aria-hidden="true" />
      </div>
    </div>
  );
}
