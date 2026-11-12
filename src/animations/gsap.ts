import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ ease: "power3.out", duration: 1 });

/* Em mobile, a barra de endereço muda a altura da viewport durante a rolagem;
   ignorar esse resize evita recálculos (e saltos) desnecessários. */
ScrollTrigger.config({ ignoreMobileResize: true });

/** Condições de mídia compartilhadas por todas as cenas. */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 821px)",
} as const;

/** Curvas do sistema — lentas na saída, como movimento de câmera. */
export const EASE = {
  out: "expo.out",
  inOut: "expo.inOut",
  soft: "power3.out",
  none: "none",
} as const;

export { gsap, ScrollTrigger };
