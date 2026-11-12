import { useEffect, useState } from "react";
import { personal } from "../data/personal";
import { SectionLight } from "../components/SectionLight";
import { RevealText } from "../components/RevealText";
import { Provisional } from "../components/Provisional";
import { Icon, type IconName } from "../components/Icon";

const ICONS: Record<string, IconName> = { GitHub: "github", LinkedIn: "linkedin" };

function useRecifeTime(): string {
  const format = () =>
    new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Recife", hour: "2-digit", minute: "2-digit" }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

/** Sala V — correspondência. Editorial, minimalista. */
export function Contact() {
  const { contact } = personal;
  const time = useRecifeTime();

  return (
    <section id="contato" className="section contact" aria-labelledby="contato-title">
      <SectionLight x="50%" y="60%" />
      <div className="container">
        <div className="sh-rule-row">
          <span className="t-numeral sh-numeral">V</span>
          <span className="t-meta sh-label">Contato</span>
          <span className="sh-rule" data-reveal="rule" aria-hidden="true" />
          <span className="t-mono sh-meta">Sala V / V · Correspondência</span>
        </div>

        <div className="contact-grid">
          <RevealText as="h2" id="contato-title" className="t-display contact-title" text={"Corres-\n*pondência*"} />

          <div className="contact-body">
            <p className="t-lead contact-message" data-reveal="fade">
              {contact.message}
            </p>

            <div className="contact-email" data-reveal="fade">
              <span className="t-meta">E-mail</span>
              <a href={`mailto:${contact.email.address}`} className="contact-email-link">
                <span>{contact.email.address}</span>
                <Icon name="arrow-up-right" size={28} />
              </a>
              {contact.email.provisional && <Provisional />}
            </div>

            <ul className="contact-links" data-reveal="fade">
              {contact.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="contact-link">
                    <Icon name={ICONS[l.label] ?? "external"} size={18} />
                    <span className="contact-link-label">{l.label}</span>
                    <span className="t-mono contact-link-handle">{l.handle}</span>
                    <Icon name="arrow-up-right" size={16} className="contact-link-arrow" />
                  </a>
                  {l.provisional && <Provisional />}
                </li>
              ))}
            </ul>

            <p className="t-mono contact-local" data-reveal="fade">
              {personal.location} · {personal.coordinates} · Hora local {time}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
