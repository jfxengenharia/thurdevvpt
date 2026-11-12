import { useEffect, useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "./animations/gsap";
import { initSmoothScroll } from "./animations/smoothScroll";
import { setupReveals } from "./animations/reveals";
import { Navbar } from "./components/Navbar";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Projects } from "./sections/Projects";
import { Library } from "./sections/Library";
import { Timeline } from "./sections/Timeline";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";

export function App() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Rolagem suave (Lenis + ticker do GSAP).
  useEffect(() => initSmoothScroll(), []);

  // Revelações declarativas — montadas depois de todas as seções (efeitos
  // filhos rodam antes do pai), portanto todos os alvos já existem.
  useLayoutEffect(() => {
    if (!rootRef.current) return;
    return setupReveals(rootRef.current);
  }, []);

  // As fontes alteram métricas de texto: recalcula as posições dos gatilhos.
  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <div ref={rootRef} className="app">
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <About />
        <Projects />
        <Library />
        <Timeline />
        <Contact />
      </main>
      <Footer />
      <div className="grain-overlay" aria-hidden="true" />
    </div>
  );
}
