import type { Artwork, ArtworkImage } from "./types";
import escolaDeAtenas from "../assets/artworks/escola-de-atenas.webp";
import apolo from "../assets/artworks/apolo.webp";
import nascimentoDeVenus from "../assets/artworks/nascimento-de-venus.webp";
import triunfoDeGalateia from "../assets/artworks/triunfo-de-galateia.webp";
import bacoEAriadne from "../assets/artworks/baco-e-ariadne.webp";
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
  venus: {
    plate: "Fig. II",
    caption: "Botticelli · O Nascimento de Vênus",
    medium: "Têmpera sobre tela, c. 1485 · Galleria degli Uffizi",
    study: "spiral",
    image: {
      src: nascimentoDeVenus,
      alt: "O Nascimento de Vênus, de Botticelli: a deusa sobre uma concha, levada pelos ventos à costa.",
      position: "50% 50%",
    },
  },
  galateia: {
    plate: "Fig. III",
    caption: "Rafael · O Triunfo de Galateia",
    medium: "Afresco, c. 1512 · Villa Farnesina, Roma",
    study: "vitruvian",
    image: {
      src: triunfoDeGalateia,
      alt: "O Triunfo de Galateia, de Rafael: a nereida sobre um carro de conchas, cercada de tritões e cupidos.",
      position: "50% 45%",
    },
  },
  baco: {
    plate: "Fig. IV",
    caption: "Ticiano · Baco e Ariadne",
    medium: "Óleo sobre tela, 1520–1523 · National Gallery, Londres",
    study: "polyhedron",
    image: {
      src: bacoEAriadne,
      alt: "Baco e Ariadne, de Ticiano: o deus salta de seu carro em direção a Ariadne na praia de Naxos.",
      position: "40% 50%",
    },
  },
  vitruviano: {
    plate: "Fig. V",
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
  "Obras reproduzidas em domínio público (Wikimedia Commons): Rafael, Botticelli, Ticiano e Leonardo da Vinci.";
