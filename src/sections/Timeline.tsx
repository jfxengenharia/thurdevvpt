import { useRef } from "react";
import { experience } from "../data/experience";
import { gsap, ScrollTrigger, MQ, EASE } from "../animations/gsap";
import { useScene } from "../animations/useScene";
import { SectionHeader } from "../components/SectionHeader";
import { SectionLight } from "../components/SectionLight";
import { Provisional } from "../components/Provisional";

/** Sala IV — linha do tempo cronológica, desenhada pela rolagem. */
export function Timeline() {
  const ref = useRef<HTMLElement>(null);

  useScene(ref, (mm, el) => {
    // Os marcos acendem ao cruzar o centro da tela (também com movimento reduzido).
    mm.add("all", () => {
      gsap.utils.toArray<HTMLElement>(".tl-entry", el).forEach((entry) => {
        ScrollTrigger.create({
          trigger: entry,
          start: "top 60%",
          toggleClass: { targets: entry, className: "is-passed" },
        });
      });
    });

    mm.add(MQ.motion, () => {
      gsap.fromTo(
        ".tl-axis-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: EASE.none,
          scrollTrigger: { trigger: ".tl", start: "top 60%", end: "bottom 60%", scrub: true },
        },
      );
    });

    mm.add(MQ.reduced, () => {
      gsap.set(".tl-axis-fill", { scaleY: 1 });
    });
  });

  return (
    <section id="trajetoria" ref={ref} className="section timeline" aria-labelledby="trajetoria-title">
      <SectionLight x="20%" y="30%" />
      <div className="container">
        <SectionHeader
          id="trajetoria-title"
          numeral="IV"
          label="Trajetória"
          meta="Sala IV / V · Cronologia"
          kicker="Formação, experiências e marcos"
          title={"Linha do\n*tempo*"}
          intro="Registro cronológico de estudos, experiências e conquistas."
        />

        <div className="tl">
          <span className="tl-axis" aria-hidden="true">
            <span className="tl-axis-fill" />
          </span>
          <ol className="tl-list">
          {experience.map((entry, i) => (
            <li className="tl-entry" key={entry.id}>
              <div className="tl-period" data-reveal="fade">
                <span className="t-mono tl-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="tl-period-text">{entry.period}</span>
              </div>
              <span className="tl-node" aria-hidden="true" />
              <div className="tl-body" data-reveal="fade">
                <p className="tl-kind">
                  <span className="t-meta tl-kind-label">{entry.kind}</span>
                  <span className="t-meta">{entry.institution}</span>
                </p>
                <h3 className="tl-title">{entry.title}</h3>
                <p className="t-body tl-desc">{entry.description}</p>
                {entry.provisional && <Provisional />}
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
