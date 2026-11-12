import { useId, type ReactNode } from "react";
import type { StudyVariant } from "../data/types";

/**
 * Estudos gráficos — placeholders das obras definitivas.
 *
 * Desenhos técnicos no espírito dos cadernos renascentistas (proporção,
 * ordens arquitetônicas, sólidos de Pacioli/Leonardo) sobre fundo em
 * chiaroscuro. Os traços com a classe `draw` são desenhados pelo sistema
 * de revelação (`data-draw`). Substituídos automaticamente quando a obra
 * recebe `image` em `src/data`.
 */

const W = 400;
const H = 500;
const PHI = (1 + Math.sqrt(5)) / 2;

interface StudyProps {
  variant: StudyVariant;
  /** Desenhar traços ao entrar na tela (desative quando a cena controla). */
  draw?: boolean;
  /** Camada HUD sobre uma obra: sem fundo, sem figura, apenas construção. */
  overlay?: boolean;
  /** Identificação da obra ("Fig. II"): a legenda do estudo usa a mesma numeração da placa. */
  plate?: string;
  className?: string;
}

/** Numeração usada quando o estudo aparece sozinho, sem obra associada. */
const DEFAULT_PLATE: Record<StudyVariant, string> = {
  portrait: "Fig. I",
  vitruvian: "Fig. II",
  column: "Fig. III",
  polyhedron: "Fig. IV",
  spiral: "Fig. V",
};

/** Atributos comuns de traço desenhável. */
const d = { className: "draw", pathLength: 1 } as const;

function Corners() {
  const m = 22;
  const s = 7;
  const pts: Array<[number, number]> = [
    [m, m],
    [W - m, m],
    [m, H - m],
    [W - m, H - m],
  ];
  return (
    <g className="st-hud-faint">
      {pts.map(([x, y]) => (
        <path key={`${x}-${y}`} d={`M${x - s} ${y}H${x + s}M${x} ${y - s}V${y + s}`} />
      ))}
    </g>
  );
}

function Scale() {
  const ticks: ReactNode[] = [];
  for (let y = 60; y <= 440; y += 19) {
    const long = (y - 60) % 95 === 0;
    ticks.push(<path key={y} d={`M30 ${y}H${long ? 40 : 35}`} />);
  }
  return <g className="st-ink-faint">{ticks}</g>;
}

function Label({ x, y, children, anchor = "start", hud = false }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end"; hud?: boolean }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className={hud ? "st-text st-text--hud" : "st-text"}>
      {children}
    </text>
  );
}

/* ——— Retrato: cânone de proporção facial sobre figura em chiaroscuro ——— */
function Portrait({ uid, overlay, fig }: { uid: string; overlay: boolean; fig: string }) {
  const figure =
    "M48 500C62 404 128 372 170 354L172 322C150 302 139 270 139 230C139 168 168 128 204 128C244 128 266 170 264 226C263 270 253 300 231 322L233 354C276 372 340 402 352 500Z";
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-skin`} x1="0" x2="1" y1="0" y2="0.3">
          <stop offset="0" stopColor="#5b4631" />
          <stop offset="0.38" stopColor="#2a1f15" />
          <stop offset="1" stopColor="#09070a" />
        </linearGradient>
        <radialGradient id={`${uid}-face`} cx="0.38" cy="0.36" r="0.4">
          <stop offset="0" stopColor="#c8a77a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#c8a77a" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${uid}-clip`}>
          <path d={figure} />
        </clipPath>
      </defs>
      {!overlay && (
        <>
          <path d={figure} fill={`url(#${uid}-skin)`} />
          <rect x="100" y="110" width="200" height="300" fill={`url(#${uid}-face)`} clipPath={`url(#${uid}-clip)`} />
        </>
      )}

      <g className="st-ink">
        <ellipse {...d} cx="202" cy="228" rx="64" ry="100" />
        <circle {...d} cx="202" cy="210" r="64" />
        <path {...d} d="M202 92V362" />
        <path {...d} d="M118 128H290M118 196H290M118 262H290M118 328H290" />
        <path {...d} d="M118 128L290 328" className="draw st-ink-faint" />
      </g>
      <path d="M126 228H282" className="st-hud" strokeDasharray="2 5" />
      <g className="st-hud">
        <path {...d} d="M322 128V328M316 128H328M316 196H328M316 262H328M316 328H328" />
      </g>
      <Label x={334} y={166} hud>I</Label>
      <Label x={334} y={233} hud>II</Label>
      <Label x={334} y={299} hud>III</Label>
      <Label x={48} y={44}>{fig} · CANON FACIAL</Label>
      <Label x={W - 48} y={H - 36} anchor="end" hud>1 : 3 · φ 1,618</Label>
    </>
  );
}

/* ——— Cânone vitruviano: círculo, quadrado, divisões áureas ——— */
function Vitruvian({ fig }: { fig: string }) {
  const cx = 200;
  const cy = 262;
  const r = 152;
  const radials: string[] = [];
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6;
    radials.push(`M${cx} ${cy}L${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return (
    <>
      <g className="st-ink">
        <circle {...d} cx={cx} cy={cy} r={r} />
        <rect {...d} x="78" y="170" width="244" height="244" />
        <path {...d} d="M78 170L322 414M322 170L78 414" />
        <path {...d} d={`M${cx} 96V430M60 292H340`} />
      </g>
      <g className="st-ink-faint">
        <circle {...d} cx={cx} cy={cy} r={r / PHI} />
        <circle {...d} cx={cx} cy={cy} r={r / PHI / PHI} />
        <path {...d} d={radials.join("")} />
      </g>
      <g className="st-hud">
        <path {...d} d={`M78 ${170 + 244 / PHI}H322`} strokeDasharray="3 4" />
        <circle cx={cx} cy={cy} r="2.5" className="st-dot" />
        <path {...d} d="M60 170V414M54 170H66M54 414H66" />
      </g>
      <Label x={48} y={44}>{fig} · HOMO AD CIRCVLVM</Label>
      <Label x={52} y={160} hud>a = 1</Label>
      <Label x={W - 48} y={H - 36} anchor="end" hud>r = a · φ⁻¹</Label>
    </>
  );
}

/* ——— Ordem jônica: fuste com êntase, capitel com volutas ——— */
function spiral(cx: number, cy: number, turns: number, rMax: number, dir: 1 | -1): string {
  const steps = 72;
  const total = turns * Math.PI * 2;
  let path = "";
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = t * total;
    const rr = rMax * (1 - t * 0.92);
    const x = cx + dir * rr * Math.cos(a);
    const y = cy + rr * Math.sin(a);
    path += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return path;
}

function Column({ fig }: { fig: string }) {
  const flutes: string[] = [];
  for (let i = 1; i < 8; i++) {
    const t = i / 8;
    const xb = 164 + 72 * t;
    const xt = 169 + 62 * t;
    flutes.push(`M${xb.toFixed(1)} 430L${xt.toFixed(1)} 152`);
  }
  return (
    <>
      <g className="st-ink">
        <path {...d} d="M164 430C161 330 166 230 169 152M236 430C239 330 234 230 231 152" />
        <path {...d} d="M146 118H254V128H146ZM156 128H244M160 140C175 152 225 152 240 140" />
        <path {...d} d={spiral(158, 140, 2.2, 15, -1)} />
        <path {...d} d={spiral(242, 140, 2.2, 15, 1)} />
        <path {...d} d="M156 430H244V440H156ZM150 440H250L246 452H154ZM140 452H260V466H140Z" />
      </g>
      <g className="st-ink-faint">
        <path {...d} d={flutes.join("")} />
        <path d="M200 90V480" strokeDasharray="2 5" />
      </g>
      <g className="st-hud">
        <path {...d} d="M112 152V430M106 152H118M106 430H118" />
        <path {...d} d="M164 482H236M164 476V488M236 476V488" />
      </g>
      <Label x={100} y={296} anchor="end" hud>9 D</Label>
      <Label x={200} y={474} anchor="middle" hud>1 D</Label>
      <Label x={48} y={44}>{fig} · ORDO IONICVS</Label>
      <Label x={W - 48} y={44} anchor="end">ÊNTASE 1/6</Label>
    </>
  );
}

/* ——— Icosaedro (De Divina Proportione) — projeção ortográfica calculada ——— */
type V3 = [number, number, number];

function icosahedron() {
  const raw: V3[] = [];
  for (const a of [-1, 1]) {
    for (const b of [-PHI, PHI]) {
      raw.push([0, a, b], [a, b, 0], [b, 0, a]);
    }
  }
  const ax = 0.42;
  const ay = 0.62;
  const rot = ([x, y, z]: V3): V3 => {
    const y1 = y * Math.cos(ax) - z * Math.sin(ax);
    const z1 = y * Math.sin(ax) + z * Math.cos(ax);
    const x2 = x * Math.cos(ay) + z1 * Math.sin(ay);
    const z2 = -x * Math.sin(ay) + z1 * Math.cos(ay);
    return [x2, y1, z2];
  };
  const verts = raw.map(rot);
  const edges: Array<[number, number]> = [];
  for (let i = 0; i < verts.length; i++) {
    for (let j = i + 1; j < verts.length; j++) {
      const [a, b] = [raw[i], raw[j]];
      const dist = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
      if (Math.abs(dist - 2) < 0.01) edges.push([i, j]);
    }
  }
  return { verts, edges };
}

const ICO = icosahedron();

function Polyhedron({ fig }: { fig: string }) {
  const s = 84;
  const cx = 200;
  const cy = 252;
  const p = (v: V3) => [cx + v[0] * s, cy + v[1] * s] as const;
  let front = "";
  let back = "";
  ICO.edges.forEach(([i, j]) => {
    const [x1, y1] = p(ICO.verts[i]);
    const [x2, y2] = p(ICO.verts[j]);
    const seg = `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
    if ((ICO.verts[i][2] + ICO.verts[j][2]) / 2 < -0.15) back += seg;
    else front += seg;
  });
  const R = s * Math.sqrt(1 + PHI * PHI);
  return (
    <>
      <g className="st-ink-faint">
        <path d={back} strokeDasharray="2 4" />
        <circle {...d} cx={cx} cy={cy} r={R} />
        <path {...d} d={`M${cx - R - 18} ${cy}H${cx + R + 18}M${cx} ${cy - R - 18}V${cy + R + 18}`} />
      </g>
      <g className="st-ink">
        <path {...d} d={front} />
      </g>
      <g className="st-hud">
        {ICO.verts.map((v, i) => {
          const [x, y] = p(v);
          return v[2] > -0.15 ? <circle key={i} cx={x} cy={y} r="2" className="st-dot" /> : null;
        })}
      </g>
      <Label x={48} y={44}>{fig} · ICOSAEDRON</Label>
      <Label x={W - 48} y={H - 36} anchor="end" hud>20 F · 30 A · 12 V</Label>
      <Label x={48} y={H - 36}>V − A + F = 2</Label>
    </>
  );
}

/* ——— Retângulo áureo e espiral ——— */
function Spiral({ fig }: { fig: string }) {
  const arc =
    "M35 352A204 204 0 0 1 239 148A126 126 0 0 1 365 274A78 78 0 0 1 287 352A48 48 0 0 1 239 304A30 30 0 0 1 269 274A18 18 0 0 1 287 292";
  return (
    <>
      <g className="st-ink-faint">
        <path {...d} d="M35 148H365V352H35Z" />
        <path {...d} d="M239 148V352M239 274H365M287 274V352M239 304H287M269 274V304M269 292H287" />
      </g>
      <g className="st-ink">
        <path {...d} d={arc} />
      </g>
      <g className="st-hud">
        <path {...d} d="M35 386H365M35 380V392M239 380V392M365 380V392" />
      </g>
      <Label x={137} y={408} anchor="middle" hud>1</Label>
      <Label x={302} y={408} anchor="middle" hud>φ⁻¹</Label>
      <Label x={48} y={44}>{fig} · SECTIO AVREA</Label>
      <Label x={W - 48} y={H - 36} anchor="end" hud>φ = 1,6180339…</Label>
    </>
  );
}

export function Study({ variant, draw = true, overlay = false, plate, className }: StudyProps) {
  const uid = useId().replace(/:/g, "");
  const fig = (plate ?? DEFAULT_PLATE[variant]).toUpperCase();
  const content = {
    portrait: <Portrait uid={uid} overlay={overlay} fig={fig} />,
    vitruvian: <Vitruvian fig={fig} />,
    column: <Column fig={fig} />,
    polyhedron: <Polyhedron fig={fig} />,
    spiral: <Spiral fig={fig} />,
  }[variant];

  return (
    <svg
      className={`study study--${variant}${overlay ? " study--overlay" : ""}${className ? ` ${className}` : ""}`}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      data-draw={draw ? "" : undefined}
      {...(overlay
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": "Estudo gráfico provisório, espaço reservado para a obra definitiva" })}
    >
      <defs>
        <radialGradient id={`${uid}-light`} cx="0.36" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#d2a66a" stopOpacity="0.32" />
          <stop offset="0.42" stopColor="#7a5634" stopOpacity="0.12" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      {!overlay && <rect width={W} height={H} fill={`url(#${uid}-light)`} />}
      {!overlay && <Scale />}
      <Corners />
      {content}
    </svg>
  );
}
