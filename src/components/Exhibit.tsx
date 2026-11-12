import type { Artwork, Project } from "../data/types";
import { Frame } from "./Frame";
import { ExhibitDetail } from "./ExhibitDetail";
import { Icon } from "./Icon";

interface ExhibitProps {
  project: Project;
  index: number;
  total: number;
  open: boolean;
  onToggle: (id: string) => void;
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

/** Uma obra da exposição: quadro + placa + ficha técnica expansível. */
export function Exhibit({ project, index, total, open, onToggle }: ExhibitProps) {
  const detailId = `ficha-${project.id}`;
  const side = index % 2 === 0 ? "left" : "right";
  const toggle = () => onToggle(project.id);
  const [screen] = project.screens;
  const plate = `${project.inventory}.1`;
  // A captura do sistema ocupa a moldura no lugar de uma pintura.
  const artwork: Artwork = {
    plate,
    caption: screen.caption,
    medium: "Captura do sistema em execução",
    study: "column",
    image: { src: screen.src, alt: screen.alt, position: "50% 0%" },
  };

  return (
    <article
      id={`obra-${project.id}`}
      className={`exhibit exhibit--${side}${open ? " is-open" : ""}`}
      aria-labelledby={`${detailId}-title`}
    >
      <div className="exhibit-main">
        <div className="exhibit-art">
          <div className="exhibit-art-float" data-parallax={side === "left" ? "0.06" : "0.1"}>
            <Frame artwork={artwork} ratio="16 / 10" variant="screen" showPlate={false} />
            <button
              type="button"
              className="exhibit-hit"
              onClick={toggle}
              aria-expanded={open}
              aria-controls={detailId}
              aria-label={`${open ? "Fechar" : "Abrir"} ficha técnica de ${project.title}`}
            >
              <span className="exhibit-cue" aria-hidden="true">
                <span className="exhibit-cue-line" />
                <span className="t-meta">{open ? "Fechar ficha" : "Abrir ficha técnica"}</span>
                <Icon name={open ? "close" : "plus"} size={14} />
              </span>
            </button>
          </div>
        </div>

        <div className="exhibit-plaque">
          <div className="exhibit-index" data-reveal="fade">
            <span className="t-numeral exhibit-numeral">{ROMAN[index] ?? index + 1}</span>
            <span className="t-mono">
              {project.inventory} · {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <span className="t-meta exhibit-category" data-reveal="fade">
            {project.category}
          </span>
          <h3 id={`${detailId}-title`} className="t-h3 exhibit-title" data-reveal="fade">
            {project.title}
          </h3>
          <p className="t-body exhibit-summary" data-reveal="fade">
            {project.summary}
          </p>
          <dl className="exhibit-facts" data-reveal="fade">
            <div>
              <dt className="t-meta">Estado</dt>
              <dd>{project.status}</dd>
            </div>
            <div>
              <dt className="t-meta">Técnica</dt>
              <dd>{project.technologies.join(" · ")}</dd>
            </div>
          </dl>
          <p className="exhibit-caption" data-reveal="fade">
            <span className="t-mono">{plate}</span> {screen.caption}
          </p>
          <div data-reveal="fade">
            <button
              type="button"
              className="exhibit-toggle"
              onClick={toggle}
              aria-expanded={open}
              aria-controls={detailId}
            >
              <span className="ed-link-tick" aria-hidden="true" />
              <span>{open ? "Fechar ficha técnica" : "Ver ficha técnica"}</span>
              <Icon name={open ? "close" : "plus"} size={15} />
            </button>
          </div>
        </div>
      </div>

      <ExhibitDetail project={project} open={open} id={detailId} onClose={toggle} />
    </article>
  );
}
