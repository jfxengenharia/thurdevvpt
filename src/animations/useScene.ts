import { useLayoutEffect, type DependencyList, type RefObject } from "react";
import { gsap } from "./gsap";

type SceneBuilder = (mm: gsap.MatchMedia, scope: HTMLElement) => void;

/**
 * Cria uma cena GSAP ligada ao ciclo de vida do componente.
 *
 * Tudo o que for criado dentro de `mm.add(...)` (tweens, timelines,
 * ScrollTriggers) é revertido automaticamente quando o componente desmonta
 * ou quando as condições de mídia mudam — sem triggers órfãos.
 */
export function useScene(scope: RefObject<HTMLElement>, build: SceneBuilder, deps: DependencyList = []): void {
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    build(mm, el);
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
