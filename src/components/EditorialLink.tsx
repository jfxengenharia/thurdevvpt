import type { MouseEvent, ReactNode } from "react";
import { scrollToTarget } from "../animations/smoothScroll";
import { Icon, type IconName } from "./Icon";

interface EditorialLinkProps {
  href: string;
  children: ReactNode;
  icon?: IconName;
  variant?: "framed" | "text";
  external?: boolean;
  className?: string;
}

/**
 * Botão/link editorial: tipografia serifada, linhas finas, detalhe em roxo.
 * Âncoras internas (#id) usam a rolagem suave da aplicação.
 */
export function EditorialLink({ href, children, icon = "arrow-right", variant = "framed", external, className }: EditorialLinkProps) {
  const internal = href.startsWith("#");

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!internal) return;
    e.preventDefault();
    scrollToTarget(href);
  };

  return (
    <a
      href={href}
      className={`ed-link ed-link--${variant}${className ? ` ${className}` : ""}`}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="ed-link-tick" aria-hidden="true" />
      <span className="ed-link-label">{children}</span>
      <Icon name={icon} size={16} className="ed-link-icon" />
    </a>
  );
}
