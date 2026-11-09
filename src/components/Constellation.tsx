import type { ResearchEntry } from "../data/types";

interface ConstellationProps {
  entries: ResearchEntry[];
}

/**
 * Mapa das investigações em forma de constelação (motivo Nous de linhas
 * douradas): cada pesquisa é uma estrela principal; seus tópicos orbitam
 * ao redor. As linhas (.draw) são desenhadas conforme a rolagem.
 */
export function Constellation({ entries }: ConstellationProps) {
  const C = 250;
  const R = 150;
  const stars = entries.map((entry, i) => {
    const a = -Math.PI / 2 + (i * Math.PI * 2) / entries.length + 0.35;
    const x = C + R * Math.cos(a);
    const y = C + R * Math.sin(a);
    const satellites = entry.topics.map((topic, j) => {
      const sa = a + (j - (entry.topics.length - 1) / 2) * 0.5;
      const sr = 64 + (j % 2) * 18;
      return { topic, x: x + sr * Math.cos(sa), y: y + sr * Math.sin(sa) };
    });
    return { entry, x, y, satellites };
  });

  const ring = stars.map((s, i) => `${i === 0 ? "M" : "L"}${s.x.toFixed(1)} ${s.y.toFixed(1)}`).join("") + "Z";
  const spokes = stars.map((s) => `M${C} ${C}L${s.x.toFixed(1)} ${s.y.toFixed(1)}`).join("");
  const links = stars
    .flatMap((s) => s.satellites.map((t) => `M${s.x.toFixed(1)} ${s.y.toFixed(1)}L${t.x.toFixed(1)} ${t.y.toFixed(1)}`))
    .join("");

  return (
    <svg className="constellation" viewBox="0 0 500 500" role="img" aria-label="Mapa das investigações em andamento">
      <g className="cs-grid">
        <circle cx={C} cy={C} r={R} />
        <circle cx={C} cy={C} r={R * 0.5} />
        <circle cx={C} cy={C} r={R + 90} strokeDasharray="2 6" />
        <path d={`M${C} 10V490M10 ${C}H490`} strokeDasharray="1 7" />
      </g>
      <path className="cs-line draw" pathLength={1} d={spokes} />
      <path className="cs-line cs-line--strong draw" pathLength={1} d={ring} />
      <path className="cs-line draw" pathLength={1} d={links} />

      <circle cx={C} cy={C} r="5" className="cs-core" />
      <text x={C} y={C + 22} textAnchor="middle" className="cs-label cs-label--core">
        QVAESTIO
      </text>

      {stars.map((s) => (
        <g key={s.entry.id}>
          <circle cx={s.x} cy={s.y} r="9" className="cs-halo" />
          <circle cx={s.x} cy={s.y} r="3.5" className="cs-star" />
          <text x={s.x} y={s.y - 16} textAnchor="middle" className="cs-label">
            Nº {s.entry.id}
          </text>
          {s.satellites.map((t) => (
            <g key={t.topic}>
              <circle cx={t.x} cy={t.y} r="1.8" className="cs-sat" />
              <text x={t.x} y={t.y + 13} textAnchor="middle" className="cs-label cs-label--sat">
                {t.topic.toUpperCase()}
              </text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}
