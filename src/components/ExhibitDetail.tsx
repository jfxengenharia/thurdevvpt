import { useLayoutEffect, useRef } from "react";
import type { Project } from "../data/types";
import { gsap, ScrollTrigger, MQ, EASE } from "../animations/gsap";
import { scrollToTarget } from "../animations/smoothScroll";
import { Provisional } from "./Provisional";
import { Icon } from "./Icon";

interface ExhibitDetailProps {
  project: Project;
  open: boolean;
  id: string;
  onClose: () => void;
}

/**
 * Ficha técnica expandida dentro da própria galeria.
 * Sempre presente no DOM (fechada = altura 0 + inert), para que a expansão
 * seja animada sem desmontar conteúdo nem perder a posição na página.
 */
export function ExhibitDetail({ project, open, id, onClose }: ExhibitDetailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prevOpen = useRef(open);
  const pending = new Set(project.pendingFields ?? []);
  const extraScreens = project.screens.slice(1);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.inert = !open;

    // Sem mudança de estado (montagem, StrictMode): apenas aplica a altura.
    if (prevOpen.current === open) {
      gsap.set(el, { height: open ? "auto" : 0 });
      return;
    }
    prevOpen.current = open;

    const reduced = window.matchMedia(MQ.reduced).matches;
    const tl = gsap.timeline({
      onComplete: () => {
        ScrollTrigger.refresh();
        if (open && el.getBoundingClientRect().top > window.innerHeight * 0.55) {
          scrollToTarget(el);
        }
      },
    });

    if (open) {
      tl.fromTo(el, { height: 0 }, { height: "auto", duration: reduced ? 0 : 1.1, ease: EASE.inOut });
      if (!reduced) {
        tl.fromTo(
          el.querySelectorAll(".xd-reveal"),
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, ease: EASE.out, stagger: 0.06 },
          0.35,
        );
      }
    } else {
      tl.to(el, { height: 0, duration: reduced ? 0 : 0.85, ease: EASE.inOut });
    }

    return () => {
      tl.kill();
    };
  }, [open]);

  const fields: Array<{ key: "description" | "objective" | "architecture"; label: string; value: string }> = [
    { key: "description", label: "Descrição", value: project.description },
    { key: "objective", label: "Objetivo", value: project.objective },
    { key: "architecture", label: "Arquitetura", value: project.architecture },
  ];

  return (
    <div ref={ref} id={id} className="xd" role="region" aria-label={`Ficha técnica: ${project.title}`}>
      <div className="xd-inner">
        <div className="xd-head xd-reveal">
          <span className="t-meta">Ficha técnica</span>
          <span className="xd-head-rule" />
          <span className="t-mono">
            {project.inventory} · {project.title}
          </span>
        </div>

        <div className="xd-grid">
          <dl className="xd-fields">
            {fields.map((f) => (
              <div className="xd-field xd-reveal" key={f.key}>
                <dt className="t-meta">{f.label}</dt>
                <dd className="t-body">
                  {f.value}{" "}
                  {f.key !== "description" && pending.has(f.key) && <Provisional label="A documentar" />}
                </dd>
              </div>
            ))}
          </dl>

          <div className="xd-side">
            <div className="xd-field xd-reveal">
              <span className="t-meta">Tecnologias</span>
              <ul className="xd-tech">
                {project.technologies.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>

            <div className="xd-field xd-reveal">
              <span className="t-meta">Estado</span>
              <p className="xd-status">
                <span className="xd-status-dot" aria-hidden="true" />
                {project.status}
              </p>
            </div>

            <div className="xd-field xd-reveal">
              <span className="t-meta">Ligações</span>
              {project.links.length > 0 ? (
                <ul className="xd-links">
                  {project.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label} <Icon name="external" size={14} />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="t-body xd-empty">
                  Nenhum link público disponível.{" "}
                  {pending.has("links") && <Provisional label="A documentar" />}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* A primeira captura já está na moldura; aqui ficam as demais. */}
        {extraScreens.length > 0 && (
          <div className="xd-screens">
            <div className="xd-screens-head xd-reveal">
              <span className="t-meta">Registro</span>
              <span className="xd-head-rule" />
              <span className="t-mono">Sistema em execução</span>
            </div>
            <div className={`xd-screens-grid${extraScreens.length > 1 ? " xd-screens-grid--pair" : ""}`}>
              {extraScreens.map((s, i) => (
                <figure className="xd-screen xd-reveal" key={s.src}>
                  <div className="xd-screen-img">
                    <img src={s.src} alt={s.alt} loading="lazy" decoding="async" width={1440} height={900} />
                  </div>
                  <figcaption>
                    <span className="t-mono">
                      {project.inventory}.{i + 2}
                    </span>{" "}
                    {s.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        <button type="button" className="xd-close xd-reveal" onClick={onClose}>
          <Icon name="close" size={16} />
          <span className="t-meta">Fechar ficha</span>
        </button>
      </div>
    </div>
  );
}
