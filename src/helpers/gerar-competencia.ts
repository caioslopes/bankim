import { format } from "date-fns";

export function gerarCompetencia(date: Date): string {
  return format(date, "yyyy-MM");
}
