import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { shelves } from "../data/technologies";
import { gsap, MQ, EASE } from "../animations/gsap";
import { useScene } from "../animations/useScene";
import { SectionHeader } from "../components/SectionHeader";
import { SectionLight } from "../components/SectionLight";
import { Bookshelf, bookKey } from "../components/Bookshelf";
import { Provisional } from "../components/Provisional";

/**
 * Sala III — biblioteca clássica. Cada categoria é uma estante; cada
 * tecnologia, um volume. A ficha catalográfica mostra o volume consultado.
 */
export function Library() {
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const firstKey = bookKey(shelves[0], shelves[0].items[0]);
  const [activeKey, setActiveKey] = useState(firstKey);

  const index = useMemo(() => {
    const map = new Map<string, { shelf: (typeof shelves)[number]; tech: (typeof shelves)[number]["items"][number]; n: number }>();
    let n = 0;
    shelves.forEach((shelf) =>
      shelf.items.forEach((tech) => {
        n += 1;
        map.set(bookKey(shelf, tech), { shelf, tech, n });
      }),
    );
    return { map, total: n };
  }, []);

  const active = index.map.get(activeKey) ?? index.map.get(firstKey)!;

  useScene(ref, (mm) => {
    mm.add(MQ.motion, () => {
      // Luz quente da sala acende conforme o visitante entra.
      gsap.fromTo(
        ".library-lamp",
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: EASE.none,
          scrollTrigger: { trigger: ".library-room", start: "top 85%", end: "top 25%", scrub: true },
        },
      );
      // Volumes deslizam para a estante.
      gsap.utils.toArray<HTMLElement>(".shelf-books").forEach((row) => {
        gsap.from(row.querySelectorAll(".book"), {
          yPercent: 104,
          duration: 1.3,
          ease: EASE.out,
          stagger: 0.035,
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
      });
    });
  });

  // Troca suave da ficha catalográfica.
  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card || window.matchMedia(MQ.reduced).matches) return;
    const tween = gsap.fromTo(
      card.querySelectorAll(".catalog-swap"),
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: EASE.soft, stagger: 0.04 },
    );
    return () => {
      tween.kill();
    };
  }, [activeKey]);

  return (
    <section id="biblioteca" ref={ref} className="section library" aria-labelledby="biblioteca-title">
      <SectionLight x="50%" y="0%" tone="warm" />
      <div className="container">
        <SectionHeader
          id="biblioteca-title"
          numeral="III"
          label="Biblioteca"
          meta="Sala III / V · Estantes"
          kicker="Tecnologias e conhecimentos"
          title={"*Ferramentas*"}
          intro="Linguagens, frameworks, bancos de dados, ferramentas e infraestrutura, organizados por estante, com o contexto em que cada um é usado."
        />

        <div className="library-room">
          <div className="library-lamp" aria-hidden="true" />
          <div className="library-shelves">
            {shelves.map((shelf) => (
              <Bookshelf key={shelf.id} shelf={shelf} activeKey={activeKey} onSelect={setActiveKey} />
            ))}
          </div>

          <aside className="catalog" aria-live="polite">
            <div ref={cardRef} className="catalog-card">
              <div className="catalog-head">
                <span className="t-meta">Ficha catalográfica</span>
                <span className="t-mono">
                  {String(active.n).padStart(3, "0")} / {String(index.total).padStart(3, "0")}
                </span>
              </div>
              <div className="catalog-body">
                <span className="t-mono catalog-swap">
                  Estante {active.shelf.numeral} · {active.shelf.category}
                </span>
                <h3 className="catalog-title catalog-swap">{active.tech.name}</h3>
                <p className="catalog-context catalog-swap">{active.tech.context}</p>
                {active.tech.provisional && (
                  <span className="catalog-swap">
                    <Provisional />
                  </span>
                )}
              </div>
              <div className="catalog-foot">
                <span className="catalog-hole" aria-hidden="true" />
                <span className="t-mono">Cat. {active.shelf.id.slice(0, 3).toUpperCase()}-{String(active.n).padStart(2, "0")}</span>
              </div>
            </div>
            <p className="t-mono catalog-hint">Passe o cursor ou navegue pelos volumes para consultar.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
