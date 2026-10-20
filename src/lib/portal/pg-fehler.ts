// Drizzle verpackt Fehler von postgres.js; der SQLSTATE steht dann in cause.
export function pgFehlercode(error: unknown): string | undefined {
  const kandidat = (error as { cause?: { code?: unknown } })?.cause ?? error
  const code = (kandidat as { code?: unknown })?.code
  return typeof code === 'string' ? code : undefined
}
