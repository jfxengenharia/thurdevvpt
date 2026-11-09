import { gsap, ScrollTrigger, MQ, EASE } from "./gsap";

/**
 * Sistema de revelação declarativo.
 *
 * Os componentes apenas marcam elementos com atributos `data-*`; este módulo
 * cria as animações correspondentes. Assim apresentação e movimento ficam
 * separados, e a lógica de desempenho vive em um único lugar.
 *
 *  data-reveal="text"   → palavras sobem por trás de uma máscara (RevealText)
 *  data-reveal="fade"   → entrada suave de baixo para cima (em lote)
 *  data-reveal="rule"   → linha editorial desenhada da origem (data-origin)
 *  data-reveal="clip"   → máscara de revelação para obras e molduras
 *  data-zoom            → zoom progressivo atrelado à rolagem
 *  data-parallax="0.2"  → deslocamento parallax (fração da altura)
 *  data-draw            → traços SVG (.draw) desenhados na entrada
 *  .section-light       → transição de iluminação entre seções
 *
 * Apenas transform, opacity e clip-path são animados — nada que provoque
 * recálculo de layout durante a rolagem.
 */
export function setupReveals(root: HTMLElement): () => void {
  const mm = gsap.matchMedia(root);

  mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (context) => {
    const { motion, desktop } = context.conditions as { motion: boolean; desktop: boolean };
    if (!motion) return;

    const q = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel, root);

    // — Tipografia mascarada —
    q("[data-reveal='text']").forEach((el) => {
      const words = el.querySelectorAll(".rv-inner");
      if (!words.length) return;
      gsap.from(words, {
        yPercent: 112,
        duration: 1.35,
        ease: EASE.out,
        stagger: { each: 0.045 },
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    // — Entradas em lote —
    const fades = q("[data-reveal='fade']");
    gsap.set(fades, { autoAlpha: 0, y: 32 });
    ScrollTrigger.batch(fades, {
      start: "top 90%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: EASE.soft,
          stagger: 0.09,
          overwrite: true,
        }),
    });

    // — Linhas editoriais —
    q("[data-reveal='rule']").forEach((el) => {
      gsap.from(el, {
        scaleX: 0,
        transformOrigin: el.dataset.origin ?? "left center",
        duration: 1.6,
        ease: EASE.inOut,
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    });

    // — Máscaras de revelação (obras) —
    q("[data-reveal='clip']").forEach((el) => {
      gsap.fromTo(
        el,
        { clipPath: "inset(14% 10% 14% 10%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.8,
          ease: EASE.inOut,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
    });

    // — Zoom progressivo (câmera aproximando enquanto a obra atravessa a tela) —
    q("[data-zoom]").forEach((el) => {
      const from = parseFloat(el.dataset.zoom || "1.22");
      gsap.fromTo(
        el,
        { scale: from },
        {
          scale: 1,
          ease: EASE.none,
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom 30%", scrub: true },
        },
      );
    });

    // — Parallax —
    q("[data-parallax]").forEach((el) => {
      const amount = parseFloat(el.dataset.parallax || "0.15") * (desktop ? 100 : 45);
      gsap.fromTo(
        el,
        { yPercent: amount / 2 },
        {
          yPercent: -amount / 2,
          ease: EASE.none,
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });

    // — Desenho técnico —
    q("[data-draw]").forEach((el) => {
      const strokes = el.querySelectorAll(".draw");
      if (!strokes.length) return;
      gsap.fromTo(
        strokes,
        { strokeDasharray: 1, strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 2.6,
          ease: "power2.inOut",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        },
      );
    });

    // — Iluminação entre seções —
    q(".section-light").forEach((light) => {
      const section = light.parentElement;
      if (!section) return;
      gsap
        .timeline({
          scrollTrigger: { trigger: section, start: "top 85%", end: "bottom 15%", scrub: true },
        })
        .fromTo(light, { opacity: 0 }, { opacity: 1, ease: EASE.none, duration: 1 })
        .to(light, { opacity: 0, ease: EASE.none, duration: 1 }, 2.2);
    });
  });

  return () => mm.revert();
}
