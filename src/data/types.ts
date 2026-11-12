/**
 * Tipos centrais do conteúdo do portfólio.
 *
 * Todo conteúdo exibido vive em `src/data/*`. Os componentes apenas apresentam.
 * Itens com `provisional: true` são dados temporários e aparecem na interface
 * com a marca "Provisório" até serem substituídos pela versão definitiva.
 */

/** Variantes de estudo gráfico usadas enquanto não há imagem definitiva. */
export type StudyVariant =
  | "portrait"
  | "vitruvian"
  | "column"
  | "polyhedron"
  | "spiral";

/** Imagem definitiva. Quando ausente, o componente usa um estudo (placeholder). */
export interface ArtworkImage {
  src: string;
  alt: string;
  /** Posição do recorte (CSS object-position). */
  position?: string;
}

export interface Artwork {
  /** Identificação editorial: "Fig. II", "Inv. 001" etc. */
  plate: string;
  /** Legenda curta abaixo da obra. */
  caption: string;
  /** Técnica / suporte, no estilo de etiqueta de museu. */
  medium: string;
  image?: ArtworkImage;
  study: StudyVariant;
}

export interface ProfileField {
  label: string;
  value: string | string[];
  provisional?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
  provisional?: boolean;
}

export interface Personal {
  firstName: string;
  lastName: string;
  /** Monograma usado na navbar. */
  monogram: string;
  role: string;
  disciplines: string[];
  location: string;
  coordinates: string;
  heroIntro: string;
  heroArtwork: Artwork;
  about: {
    lead: string;
    paragraphs: string[];
    fields: ProfileField[];
  };
  contact: {
    message: string;
    email: { address: string; provisional?: boolean };
    links: SocialLink[];
  };
}

export interface ProjectLink {
  label: string;
  href: string;
}

/** Captura de tela do sistema em execução, exibida na ficha técnica. */
export interface ProjectScreen {
  src: string;
  alt: string;
  caption: string;
}

export interface Project {
  id: string;
  inventory: string;
  title: string;
  category: string;
  year: string;
  status: string;
  summary: string;
  description: string;
  objective: string;
  architecture: string;
  technologies: string[];
  links: ProjectLink[];
  artwork: Artwork;
  /** Capturas do sistema em execução (registro fotográfico da obra). */
  screens?: ProjectScreen[];
  provisional?: boolean;
  /** Campos específicos ainda não documentados. */
  pendingFields?: Array<"objective" | "architecture" | "links" | "year">;
}

export type ExperienceKind = "Formação" | "Experiência" | "Marco";

export interface ExperienceEntry {
  id: string;
  period: string;
  kind: ExperienceKind;
  title: string;
  institution: string;
  description: string;
  provisional?: boolean;
}

export interface Technology {
  name: string;
  /** Contexto de uso conhecido. */
  context: string;
  provisional?: boolean;
}

export interface TechnologyShelf {
  id: string;
  category: string;
  numeral: string;
  description: string;
  items: Technology[];
}

export interface NavItem {
  id: string;
  numeral: string;
  label: string;
}
