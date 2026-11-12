import type { Artwork, ArtworkImage } from "./types";
import escolaDeAtenas from "../assets/artworks/escola-de-atenas.webp";
import apolo from "../assets/artworks/apolo.webp";
import homemVitruviano from "../assets/artworks/homem-vitruviano.webp";

/**
 * Acervo — obras renascentistas de tema greco-romano, em domínio público
 * (reproduções via Wikimedia Commons, arquivos otimizados em src/assets/artworks).
 *
 * Para trocar uma obra, substitua o arquivo e a etiqueta aqui; os
 * componentes não precisam mudar.
 */

/** Pintura de fundo do Hero; `vanishingPoint` (frações da imagem) orienta as linhas do HUD. */
export const heroPainting: ArtworkImage & {
  credit: string;
  vanishingPoint: { x: number; y: number };
} = {
  src: escolaDeAtenas,
  alt: "A Escola de Atenas, de Rafael: filósofos gregos reunidos sob abóbadas de arquitetura romana.",
  position: "50% 50%",
  credit: "Rafael · A Escola de Atenas · 1509–1511 · Afresco · Palácio Apostólico, Vaticano",
  vanishingPoint: { x: 0.506, y: 0.6 },
};

export const artworks = {
  apolo: {
    plate: "Fig. I",
    caption: "Apolo, estátua na Escola de Atenas",
    medium: "Rafael · Afresco, 1509–1511 · detalhe",
    study: "spiral",
    image: {
      src: apolo,
      alt: "Detalhe da estátua de Apolo com a lira, pintada por Rafael na Escola de Atenas.",
      position: "50% 40%",
    },
  },
  vitruviano: {
    plate: "Fig. II",
    caption: "Leonardo · Homem Vitruviano",
    medium: "Pena e tinta sobre papel, c. 1490 · Gallerie dell'Accademia",
    study: "column",
    image: {
      src: homemVitruviano,
      alt: "Homem Vitruviano, de Leonardo da Vinci: estudo das proporções humanas segundo Vitrúvio.",
      position: "50% 40%",
    },
  },
} satisfies Record<string, Artwork>;

export const artworkCredit =
  "Obras reproduzidas em domínio público (Wikimedia Commons): Rafael e Leonardo da Vinci.";
