import FonteRecorrente from "../database/model/FonteRecorrente";
import Lancamento from "../database/model/Lancamento";
import { gerarCompetencia } from "./manipular-meses";

export function calcularValorMes(
  competencia: string,
  lancamentos: Lancamento[],
  fontes: FonteRecorrente[]
) {
  const lancamentosDoMes = lancamentos.filter(
    (l) => gerarCompetencia(new Date(l.dataVencimento)) === competencia
  );

  const fontesDespesas = fontes.filter((f) => f.tipoMovimento === "DESPESA");

  const fontesRendas = fontes.filter((f) => f.tipoMovimento === "RENDA");

  const gastosLancamentos = lancamentosDoMes
    .filter((l) => l.tipoMovimento === "DESPESA")
    .reduce((acc, l) => acc + Math.abs(l.valor), 0);

  const gastosFontes = fontesDespesas.reduce((acc, f) => acc + f.valor, 0);

  const gastos = gastosLancamentos + gastosFontes;

  const faltaPagarLancamentos = lancamentosDoMes
    .filter((l) => !l.dataPagamento)
    .reduce((acc, l) => acc + Math.abs(l.valor), 0);

  const faltaPagarFontes = fontesDespesas.reduce((acc, f) => acc + f.valor, 0);

  const faltaPagar = faltaPagarLancamentos + faltaPagarFontes;

  const totalRenda = fontesRendas.reduce((acc, f) => acc + f.valor, 0);

  const saldo = totalRenda - gastos;

  return { saldo, gastos, faltaPagar };
}
