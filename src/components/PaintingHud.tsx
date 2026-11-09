import { heroPainting } from "../data/artworks";

/**
 * Camada HUD sobre a pintura do Hero (fotomontagem Nous): linhas de
 * construção da perspectiva central do afresco — ortogonais convergindo
 * para o ponto de fuga e a linha do horizonte.
 *
 * O viewBox tem a mesma proporção da imagem e ambos usam enquadramento
 * "cover" centralizado, então as linhas acompanham a pintura em
 * qualquer tamanho de tela.
 */
const VW = 2400;
const VH = 1774;

export function PaintingHud() {
  const vp = { x: heroPainting.vanishingPoint.x * VW, y: heroPainting.vanishingPoint.y * VH };
  const targets: Array<[number, number]> = [
    [0, 0],
    [VW, 0],
    [0, VH],
    [VW, VH],
    [VW * 0.28, VH],
    [VW * 0.72, VH],
    [0, VH * 0.82],
    [VW, VH * 0.82],
  ];
  const orthogonals = targets.map(([x, y]) => `M${vp.x.toFixed(0)} ${vp.y.toFixed(0)}L${x.toFixed(0)} ${y.toFixed(0)}`).join("");

  return (
    <svg className="painting-hud" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <path className="ph-ortho draw" pathLength={1} d={orthogonals} />
      <path className="ph-horizon" d={`M0 ${vp.y}H${VW}`} />
    </svg>
  );
}
