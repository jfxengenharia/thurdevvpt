import { personal } from "../data/personal";
import { artworks } from "../data/artworks";
import { SectionHeader } from "../components/SectionHeader";
import { Frame } from "../components/Frame";
import { Provisional } from "../components/Provisional";
import { SectionLight } from "../components/SectionLight";

/** Sala I — perfil apresentado como ficha acadêmica. */
export function About() {
  const { about } = personal;

  return (
    <section id="sobre" className="section about" aria-labelledby="sobre-title">
      <SectionLight x="80%" y="20%" />
      <div className="about-marble" aria-hidden="true" />
      <div className="container">
        <SectionHeader
          id="sobre-title"
          numeral="I"
          label="Sobre"
          meta="Sala I / V · Ficha"
          kicker="Perfil acadêmico"
          title={"A engenharia\npor trás da *interface*"}
        />

        <div className="about-grid">
          <aside className="about-aside">
            <div className="about-figure" data-parallax="0.08">
              <Frame
                tone="ebony"
                ratio="4 / 5"
                artwork={artworks.vitruviano}
              />
            </div>
          </aside>

          <div className="about-main">
            <p className="t-lead about-lead" data-reveal="fade">
              {about.lead}
            </p>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="t-body about-p" data-reveal="fade">
                {p}
              </p>
            ))}

            <div className="record" data-reveal="fade">
              <div className="record-head">
                <span className="t-meta">Ficha acadêmica</span>
                <span className="t-mono">Reg. {personal.monogram}</span>
              </div>
              <dl className="record-list">
                {about.fields.map((field) => (
                  <div className="record-row" key={field.label}>
                    <dt className="t-meta">{field.label}</dt>
                    <dd>
                      {Array.isArray(field.value) ? (
                        <ul>
                          {field.value.map((v) => (
                            <li key={v}>{v}</li>
                          ))}
                        </ul>
                      ) : (
                        field.value
                      )}
                      {field.provisional && <Provisional />}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
