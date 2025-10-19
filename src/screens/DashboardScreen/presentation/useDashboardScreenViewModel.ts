import { useEffect, useState } from "react";
import { fonteRecorrenteRepository } from "../../../repositories/FonteRecorrenteRepository";
import FonteRecorrente from "../../../database/model/FonteRecorrente";
import { lancamentoRepository } from "../../../repositories/LancamentoRepository";
import Lancamento from "../../../database/model/Lancamento";
import {
  gerarCompetencia,
  gerarMesesDoAno,
} from "../../../helpers/manipular-meses";

type DashboardMes = {
  saldo: number;
  gastos: number;
  faltaPagar: number;
};

type DashboardData = Record<string, DashboardMes>;

export default function useDashboardScreenViewModel() {
  const [fontes, setFontes] = useState<FonteRecorrente[]>([]);
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);

  const [loading, setLoading] = useState<{
    fontes: boolean;
    lancamentos: boolean;
  }>({
    fontes: false,
    lancamentos: false,
  });

  const meses = gerarMesesDoAno();
  const dashboard: DashboardData = {};

  meses.forEach((competencia) => {
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

    const faltaPagarFontes = fontesDespesas.reduce(
      (acc, f) => acc + f.valor,
      0
    );

    const faltaPagar = faltaPagarLancamentos + faltaPagarFontes;

    const totalRenda = fontesRendas.reduce((acc, f) => acc + f.valor, 0);

    const saldo = totalRenda - gastos;

    dashboard[competencia] = { saldo, gastos, faltaPagar };
  });

  useEffect(() => {
    setLoading({ fontes: true, lancamentos: true });
    const fonteRecorrenteObservable =
      fonteRecorrenteRepository.observeActiveFonteRecorrente();
    const lancamentoObsersable =
      lancamentoRepository.observeActiveLancamentos();

    const fonteRecorrenteSubscription = fonteRecorrenteObservable.subscribe(
      (fontes) => {
        setFontes(fontes);
        setLoading((prev) => ({ ...prev, fontes: false }));
      }
    );

    const lancaementoSubscription = lancamentoObsersable.subscribe(
      (lancamentos) => {
        setLancamentos(lancamentos);
        setLoading((prev) => ({ ...prev, lancamentos: false }));
      }
    );

    return () => {
      fonteRecorrenteSubscription.unsubscribe();
      lancaementoSubscription.unsubscribe();
    };
  }, []);

  return {
    mesVigente: {
      ...dashboard[gerarCompetencia(new Date())],
      competencia: gerarCompetencia(new Date()),
    },
    meses: Object.keys(dashboard)
      .filter((key) => key !== gerarCompetencia(new Date()))
      .map((key) => ({
        ...dashboard[key],
        competencia: key,
      })),
    isLoading: Object.values(loading).every(Boolean),
  };
}
