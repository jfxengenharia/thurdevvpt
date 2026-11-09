import type { ReactNode } from "react";
import type { Artwork } from "../data/types";
import { Study } from "./Study";

interface FrameProps {
  artwork: Artwork;
  /** Proporção do quadro (largura / altura). */
  ratio?: string;
  /** Moldura dourada (obras) ou ébano (peças menores). */
  tone?: "gilt" | "ebony";
  /** Placa de identificação abaixo da obra. */
  showPlate?: boolean;
  /** Ativa revelação por máscara + zoom progressivo atrelado à rolagem. */
  scrollReveal?: boolean;
  /** Desenho dos traços do estudo ao entrar na tela. */
  drawStudy?: boolean;
  /** Prioriza o carregamento da imagem (ex.: Hero). */
  eager?: boolean;
  /** Linhas de construção (HUD) sobre a obra. */
  hud?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Moldura clássica de museu.
 *
 * Camadas internas (de fora para dentro):
 *  frame-canvas → máscara de revelação (clip-path)
 *  frame-zoom   → zoom progressivo controlado pela rolagem
 *  frame-hover  → zoom suave de hover (CSS)
 * Separar as camadas evita que animações diferentes disputem o mesmo transform.
 * Com `artwork.image`, a obra recebe tratamento de museu (cores envelhecidas,
 * chiaroscuro) e, por cima, a construção técnica do estudo como camada HUD.
 */
export function Frame({
  artwork,
  ratio = "4 / 5",
  tone = "gilt",
  showPlate = true,
  scrollReveal = true,
  drawStudy = true,
  eager = false,
  hud = true,
  className,
  children,
}: FrameProps) {
  return (
    <figure className={`frame frame--${tone}${className ? ` ${className}` : ""}`}>
      <div className="frame-moulding">
        <div
          className="frame-canvas"
          style={{ aspectRatio: ratio }}
          data-reveal={scrollReveal ? "clip" : undefined}
        >
          <div className="frame-zoom" data-zoom={scrollReveal ? "1.2" : undefined}>
            <div className="frame-hover">
              {artwork.image ? (
                <>
                  <img
                    className="frame-img"
                    src={artwork.image.src}
                    alt={artwork.image.alt}
                    style={{ objectPosition: artwork.image.position }}
                    loading={eager ? "eager" : "lazy"}
                    decoding="async"
                  />
                  {/* Fotomontagem Nous: construção técnica sobre a obra clássica. */}
                  {hud && <Study variant={artwork.study} draw={drawStudy} overlay />}
                </>
              ) : (
                <Study variant={artwork.study} draw={drawStudy} />
              )}
            </div>
          </div>
          <div className="frame-texture" aria-hidden="true" />
          <div className="frame-shade" aria-hidden="true" />
          <div className="frame-spot" aria-hidden="true" />
          {children}
        </div>
      </div>
      {showPlate && (
        <figcaption className="frame-plate">
          <span className="t-mono frame-plate-id">{artwork.plate}</span>
          <span className="frame-plate-caption">{artwork.caption}</span>
          <span className="t-meta frame-plate-medium">{artwork.medium}</span>
        </figcaption>
      )}
    </figure>
  );
}
