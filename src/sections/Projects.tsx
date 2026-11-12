import { useCallback, useEffect, useState } from "react";
import { projects } from "../data/projects";
import { SectionHeader } from "../components/SectionHeader";
import { SectionLight } from "../components/SectionLight";
import { Exhibit } from "../components/Exhibit";

/** Sala II — projetos apresentados como obras de uma exposição. */
export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setOpenId((cur) => (cur === id ? null : id));
  }, []);

  // Esc fecha a ficha aberta e devolve o foco à obra.
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const id = openId;
      setOpenId(null);
      document.querySelector<HTMLElement>(`#obra-${id} .exhibit-toggle`)?.focus({ preventScroll: true });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  return (
    <section id="obras" className="section projects" aria-labelledby="obras-title">
      <SectionLight x="15%" y="5%" tone="warm" />
      <div className="container">
        <SectionHeader
          id="obras-title"
          numeral="II"
          label="Obras"
          meta="Sala II / V · Exposição"
          kicker="Exposição permanente"
          title={"Obras em\n*exposição*"}
          intro="Projetos, experimentos e sistemas em construção. Cada obra abre a sua ficha técnica sem sair da galeria."
        />

        <div className={`exhibits${openId ? " has-open" : ""}`}>
          {projects.map((p, i) => (
            <Exhibit
              key={p.id}
              project={p}
              index={i}
              total={projects.length}
              open={openId === p.id}
              onToggle={toggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
