import Lenis from "lenis";
import { gsap, ScrollTrigger, MQ } from "./gsap";

/**
 * Rolagem suave com Lenis, sincronizada ao ticker do GSAP.
 * Um único relógio (gsap.ticker) dirige Lenis e ScrollTrigger, evitando
 * dois loops de requestAnimationFrame concorrentes.
 * Com prefers-reduced-motion, Lenis não é iniciado: rolagem nativa.
 */
let lenis: Lenis | null = null;

export function initSmoothScroll(): () => void {
  if (window.matchMedia(MQ.reduced).matches) return () => undefined;

  lenis = new Lenis({
    lerp: 0.085,
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.4,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

function navOffset(): number {
  const value = getComputedStyle(document.documentElement).getPropertyValue("--nav-h");
  return -(parseFloat(value) || 0);
}

/** Navegação por âncora — passa pela Lenis quando ativa. */
export function scrollToTarget(target: string | HTMLElement | number, immediate = false): void {
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (el === null) return;

  if (lenis) {
    lenis.scrollTo(el, {
      offset: typeof el === "number" ? 0 : navOffset(),
      duration: immediate ? 0 : 1.6,
      immediate,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
    return;
  }

  if (typeof el === "number") {
    window.scrollTo({ top: el });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + navOffset();
    window.scrollTo({ top });
  }
}

export function lockScroll(locked: boolean): void {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
