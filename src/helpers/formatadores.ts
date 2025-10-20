export function formatarValorMonetario(value?: number | string | null): string {
  const numericValue = Number(value) || 0;
  return numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
