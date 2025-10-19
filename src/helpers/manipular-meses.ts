import { addMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function gerarMesesDoAno(): string[] {
  const meses: string[] = [];
  const hoje = new Date();

  for (let i = 0; i < 12; i++) {
    const mes = addMonths(hoje, i);
    meses.push(format(mes, "yyyy-MM"));
  }

  return meses;
}

export function gerarCompetencia(date: Date): string {
  return format(date, "yyyy-MM");
}

export function desestruturarCompetencia(competencia: string) {
  const [anoString, mesString] = competencia.split("-");

  const mesIndex = Number(mesString) - 1;
  const anoNumber = Number(anoString);

  const data = new Date(anoNumber, mesIndex, 1);
  const nomeMes = format(data, "MMMM", { locale: ptBR });

  return {
    ano: anoString,
    mes: nomeMes,
  };
}
