import { personal } from "../data/personal";

interface MonogramProps {
  className?: string;
}

/** Monograma "AP" em Karstar (MaulanaCreative — licença gratuita apenas para uso pessoal). */
export function Monogram({ className }: MonogramProps) {
  return (
    <span className={`monogram${className ? ` ${className}` : ""}`} aria-label={personal.monogram} role="img">
      <span aria-hidden="true">{personal.monogram}</span>
    </span>
  );
}
