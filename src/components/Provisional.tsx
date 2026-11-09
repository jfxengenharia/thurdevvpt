interface ProvisionalProps {
  label?: string;
}

/** Marca discreta para conteúdo temporário — nunca apresentado como real. */
export function Provisional({ label = "Provisório" }: ProvisionalProps) {
  return (
    <span className="provisional" title="Conteúdo provisório, aguardando versão definitiva">
      {label}
    </span>
  );
}
