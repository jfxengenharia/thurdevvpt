import type { CSSProperties } from "react";

interface SectionLightProps {
  x?: string;
  y?: string;
  /** Cor da luz — roxo discreto por padrão, âmbar para salas "quentes". */
  tone?: "violet" | "warm";
}

/** Foco de luz da sala; sua opacidade acompanha a rolagem (ver reveals.ts). */
export function SectionLight({ x = "20%", y = "10%", tone = "violet" }: SectionLightProps) {
  const style = {
    "--light-x": x,
    "--light-y": y,
    "--light-color": tone === "warm" ? "rgba(214, 160, 96, 0.11)" : "rgba(109, 74, 168, 0.12)",
  } as CSSProperties;
  return <div className="section-light" style={style} aria-hidden="true" />;
}
