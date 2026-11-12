import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { navigation, personal } from "../data/personal";
import { gsap, ScrollTrigger, MQ, EASE } from "../animations/gsap";
import { lockScroll, scrollToTarget } from "../animations/smoothScroll";
import { Icon } from "./Icon";
import { Monogram } from "./Monogram";

/**
 * Navbar editorial: monograma à esquerda, índice centralizado,
 * detalhes técnicos discretos (coordenadas + progresso da leitura).
 * Em telas pequenas, o índice vira um sumário em tela cheia.
 */
export function Navbar() {
  const barRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Progresso, seção ativa e ocultação ao rolar para baixo.
  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const setScale = gsap.quickSetter(progressRef.current, "scaleX");
    let lastPercent = -1;

    const progress = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        setScale(self.progress);
        const pct = Math.round(self.progress * 100);
        if (pct !== lastPercent && percentRef.current) {
          lastPercent = pct;
          percentRef.current.textContent = String(pct).padStart(3, "0");
        }
        const y = self.scroll();
        bar.classList.toggle("is-solid", y > 40);
        bar.classList.toggle("is-hidden", self.direction === 1 && y > window.innerHeight * 0.9);
      },
    });

    const sections = navigation.map((item) =>
      ScrollTrigger.create({
        trigger: `#${item.id}`,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          if (self.isActive) setActive(item.id);
          // Voltando ao Hero: nenhuma seção ativa.
          else if (item.id === navigation[0].id && self.direction === -1) setActive("");
        },
      }),
    );

    return () => {
      progress.kill();
      sections.forEach((s) => s.kill());
    };
  }, []);

  // Sumário mobile: animação de abertura, bloqueio de rolagem, Esc para fechar.
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    menu.inert = !menuOpen;
    // Com o sumário aberto, o conteúdo por trás sai da ordem de tabulação.
    document.querySelectorAll<HTMLElement>("main, footer").forEach((el) => (el.inert = menuOpen));
    lockScroll(menuOpen);

    const reduced = window.matchMedia(MQ.reduced).matches;
    const items = menu.querySelectorAll(".mmenu-item, .mmenu-foot");

    if (menuOpen) {
      gsap.set(menu, { visibility: "visible" });
      if (!reduced) {
        gsap.fromTo(menu, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: EASE.inOut });
        gsap.fromTo(items, { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, ease: EASE.out, stagger: 0.05, delay: 0.35 });
      } else {
        gsap.set(menu, { clipPath: "inset(0 0 0% 0)" });
      }
      menu.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }

    if (reduced) {
      gsap.set(menu, { visibility: "hidden" });
    } else {
      gsap.to(menu, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.7,
        ease: EASE.inOut,
        onComplete: () => gsap.set(menu, { visibility: "hidden" }),
      });
    }
    return undefined;
  }, [menuOpen]);

  // No layout desktop o sumário e o seu botão deixam de existir. Se a tela
  // cruzar o breakpoint com ele aberto (tablet girado, janela redimensionada),
  // fecha — senão a rolagem ficaria bloqueada sem um controle para liberar.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 961px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const wasOpen = menuOpen;
    setMenuOpen(false);
    // Aguarda a liberação da rolagem antes de navegar.
    window.setTimeout(() => scrollToTarget(id), wasOpen ? 60 : 0);
  };

  return (
    <>
      <header ref={barRef} className="nav">
        <div className="nav-inner">
          <a href="#inicio" className="nav-brand" onClick={(e) => go(e, "#inicio")} aria-label={`${personal.firstName} ${personal.lastName} · início`}>
            <Monogram className="nav-monogram" />
          </a>

          <nav className="nav-links" aria-label="Seções">
            <ol>
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`nav-link${active === item.id ? " is-active" : ""}`}
                    aria-current={active === item.id ? "true" : undefined}
                    onClick={(e) => go(e, `#${item.id}`)}
                  >
                    <span className="nav-link-num">{item.numeral}</span>
                    <span className="nav-link-label">{item.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="nav-tech t-mono" aria-hidden="true">
            <span>{personal.coordinates}</span>
            <span className="nav-tech-sep" />
            <span>
              § <span ref={percentRef}>000</span>
            </span>
          </div>

          <button
            type="button"
            className="nav-menu-btn"
            aria-expanded={menuOpen}
            aria-controls="sumario"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="t-meta">{menuOpen ? "Fechar" : "Índice"}</span>
            <Icon name={menuOpen ? "close" : "menu"} size={20} />
          </button>
        </div>
        <span className="nav-progress" aria-hidden="true">
          <span ref={progressRef} className="nav-progress-fill" />
        </span>
      </header>

      <div ref={menuRef} id="sumario" className="mmenu" role="dialog" aria-modal="true" aria-label="Sumário">
        <div className="mmenu-inner">
          <p className="t-meta mmenu-title mmenu-item">Sumário</p>
          <ol>
            {navigation.map((item) => (
              <li key={item.id} className="mmenu-item">
                <a href={`#${item.id}`} onClick={(e) => go(e, `#${item.id}`)}>
                  <span className="t-numeral">{item.numeral}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="mmenu-foot">
            <Monogram className="mmenu-monogram" />
            <span className="t-mono">{personal.coordinates}</span>
          </div>
        </div>
      </div>
    </>
  );
}
