import { useRef } from "react";
import { personal } from "../data/personal";
import { heroPainting } from "../data/artworks";
import { gsap, MQ, EASE } from "../animations/gsap";
import { useScene } from "../animations/useScene";
import { scrollToTarget } from "../animations/smoothScroll";
import { Frame } from "../components/Frame";
import { PaintingHud } from "../components/PaintingHud";
import { RevealText } from "../components/RevealText";
import { EditorialLink } from "../components/EditorialLink";
import { Icon } from "../components/Icon";

/**
 * Vestíbulo — composição monumental (arcada em perspectiva, luz no ponto de
 * fuga) com retrato editorial emoldurado. Movimento:
 *  1. Abertura: a pintura acende, o arco é desenhado, a moldura se revela.
 *  2. Rolagem (desktop): cena fixada; a câmera avança para dentro da
 *     arcada enquanto a luz baixa — transição para a primeira sala.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useScene(ref, (mm, el) => {
    mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
      const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
      if (!motion) return;

      // — Abertura —
      const intro = gsap.timeline({ delay: 0.1, defaults: { ease: EASE.out } });
      intro
        .from(".hero-canvas-inner", { scale: 1.2, autoAlpha: 0, duration: 2.8 }, 0)
        .fromTo(
          ".painting-hud .draw",
          { strokeDasharray: 1, strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 2.8, ease: "power2.inOut", stagger: 0.25 },
          1.0,
        )
        .fromTo(
          ".hero-frame-intro",
          { clipPath: "inset(50% 0% 50% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.7, ease: EASE.inOut },
          0.55,
        )
        .from(".hero-frame-intro .frame-zoom", { scale: 1.4, duration: 2.6 }, 0.9)
        .fromTo(
          ".hero-frame-intro .draw",
          { strokeDasharray: 1, strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 2.4, stagger: 0.06, ease: "power2.inOut" },
          1.3,
        )
        .from(".hero-name .rv-inner", { yPercent: 118, duration: 1.6, stagger: 0.14 }, 0.75)
        .from(".hero-reveal", { y: 26, autoAlpha: 0, duration: 1.3, stagger: 0.09 }, 1.2)
        .from(".hero-hud", { autoAlpha: 0, duration: 1.6, stagger: 0.12 }, 1.6);

      // — Câmera —
      if (desktop) {
        gsap
          .timeline({
            defaults: { ease: EASE.none },
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "+=85%",
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
            },
          })
          .to(".hero-canvas", { scale: 1.22, yPercent: 3 }, 0)
          .to(".hero-frame-wrap", { yPercent: -14, scale: 1.08 }, 0)
          .to(".hero-copy", { yPercent: -22, autoAlpha: 0 }, 0)
          .to(".hero-dusk", { opacity: 1 }, 0)
          .to(".hero-foot", { autoAlpha: 0, duration: 0.25 }, 0);
      } else {
        gsap.to(".hero-canvas", {
          yPercent: 16,
          ease: EASE.none,
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
      }
    });
  });

  return (
    <section id="inicio" ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero-canvas" aria-hidden="true">
        <div className="hero-canvas-inner">
          <img
            className="hero-painting"
            src={heroPainting.src}
            alt=""
            style={{ objectPosition: heroPainting.position }}
            loading="eager"
            decoding="async"
          />
          <div className="hero-chiaroscuro" />
          <PaintingHud />
          <div className="hero-paint-texture" />
        </div>
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-dusk" aria-hidden="true" />

      <div className="hero-grid container">
        <div className="hero-copy">
          <div className="hero-meta hero-reveal">
            <span className="t-meta">Portfólio · Edição {personal.edition}</span>
            <span className="hero-meta-rule" />
            <span className="t-meta">{personal.location}</span>
          </div>

          <RevealText
            as="h1"
            id="hero-title"
            className="t-display hero-name"
            reveal={false}
            text={`${personal.firstName}\n*${personal.lastName}*`}
          />

          <p className="hero-role hero-reveal">
            <span className="hero-role-main">{personal.role}</span>
            <span className="hero-role-list">{personal.disciplines.join(" · ")}</span>
          </p>

          <p className="t-body hero-intro hero-reveal">{personal.heroIntro}</p>

          <div className="hero-actions hero-reveal">
            <EditorialLink href="#obras">Visitar as obras</EditorialLink>
            <EditorialLink href="#contato" variant="text" icon="arrow-up-right">
              Correspondência
            </EditorialLink>
          </div>
        </div>

        <div className="hero-frame-wrap">
          <div className="hero-hud hero-hud--top t-mono">
            <span>{personal.heroArtwork.plate}</span>
            <span className="hero-hud-line" />
            <span>Sala 0 · Vestíbulo</span>
          </div>
          <div className="hero-frame-intro">
            <Frame
              artwork={personal.heroArtwork}
              ratio="4 / 5"
              showPlate={false}
              scrollReveal={false}
              drawStudy={false}
              eager
            />
          </div>
          <div className="hero-hud hero-hud--bottom">
            <span className="frame-plate-caption">{personal.heroArtwork.caption}</span>
            <span className="t-meta">{personal.heroArtwork.medium}</span>
          </div>
          <span className="hero-hud hero-hud-cross hero-hud-cross--a" aria-hidden="true" />
          <span className="hero-hud hero-hud-cross hero-hud-cross--b" aria-hidden="true" />
        </div>
      </div>

      <div className="hero-foot">
        <div className="hero-foot-inner container hero-hud">
          <button type="button" className="hero-scroll" onClick={() => scrollToTarget("#sobre")}>
            <span className="hero-scroll-line" aria-hidden="true" />
            <span className="t-meta">Role para entrar na galeria</span>
            <Icon name="arrow-down" size={14} />
          </button>
          <span className="t-mono hero-foot-coords">{heroPainting.credit}</span>
        </div>
      </div>
    </section>
  );
}
