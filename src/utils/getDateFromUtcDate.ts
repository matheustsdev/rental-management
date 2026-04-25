/**
 * Converte uma data vinda do banco (UTC 00:00) para o fuso do Brasil (UTC-3),
 * garantindo que a data seja exibida corretamente no frontend sem retroceder um dia.
 */
export function getDateFromUtcDate(date: Date | string | null | undefined): Date | null {
  if (!date) return null;
  const d = new Date(date);

  // Se a data vinda do banco for meia-noite UTC, ela retrocederia no fuso -3.
  // Adicionamos 3 horas para que no Brasil ela seja 00:00:00.
  if (d.getUTCHours() === 0 && d.getUTCMinutes() === 0) {
    d.setUTCHours(3);
  }

  return d;
}
