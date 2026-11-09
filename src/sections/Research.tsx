import { useRef } from "react";
import { research } from "../data/research";
import { gsap, MQ, EASE } from "../animations/gsap";
import { useScene } from "../animations/useScene";
import { SectionHeader } from "../components/SectionHeader";
import { SectionLight } from "../components/SectionLight";
import { Constellation } from "../components/Constellation";
import { Provisional } from "../components/Provisional";

/** Sala V — caderno de investigações em andamento. */
export function Research() {
  const ref = useRef<HTMLElement>(null);

  useScene(ref, (mm) => {
    mm.add(MQ.motion, () => {
      // A constelação é traçada enquanto o caderno é lido.
      gsap.fromTo(
        ".constellation .draw",
        { strokeDasharray: 1, strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: EASE.none,
          stagger: 0.15,
          scrollTrigger: { trigger: ".research-grid", start: "top 70%", end: "center 45%", scrub: 0.6 },
        },
      );
      gsap.from(".constellation .cs-star, .constellation .cs-halo, .constellation .cs-sat", {
        scale: 0,
        transformOrigin: "center",
        duration: 1,
        ease: "back.out(2)",
        stagger: 0.03,
        scrollTrigger: { trigger: ".research-grid", start: "top 65%", once: true },
      });
    });
  });

  return (
    <section id="pesquisa" ref={ref} className="section research" aria-labelledby="pesquisa-title">
      <SectionLight x="75%" y="15%" />
      <div className="container">
        <SectionHeader
          id="pesquisa-title"
          numeral="V"
          label="Pesquisa"
          meta="Sala V / VI · Gabinete"
          kicker="Pesquisa em andamento"
          title={"Caderno de\n*investigações*"}
          intro="Assuntos em estudo, tecnologias em exploração, problemas investigados e experimentos em desenvolvimento."
        />

        <div className="research-grid">
          <div className="research-map">
            <div className="research-map-sticky">
              <Constellation entries={research} />
              <p className="t-mono research-map-caption">Fig. VI · Mapa das investigações · {research.length} registros</p>
            </div>
          </div>

          <ol className="notes">
            {research.map((r) => (
              <li className="note" key={r.id} data-reveal="fade">
                <div className="note-head">
                  <span className="t-mono note-id">Nº {r.id}</span>
                  <span className="t-meta note-kind">{r.kind}</span>
                  <span className="note-status">
                    <span className="note-status-dot" aria-hidden="true" />
                    <span className="t-meta">{r.status}</span>
                  </span>
                </div>
                <h3 className="note-title">{r.title}</h3>
                <p className="t-body note-summary">{r.summary}</p>
                <div className="note-foot">
                  <ul className="note-topics">
                    {r.topics.map((t) => (
                      <li key={t} className="t-mono">
                        {t}
                      </li>
                    ))}
                  </ul>
                  {r.provisional && <Provisional />}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
