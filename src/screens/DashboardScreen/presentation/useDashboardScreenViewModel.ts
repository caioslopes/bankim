import { useEffect, useState } from "react";
import { fonteRecorrenteRepository } from "../../../repositories/FonteRecorrenteRepository";
import FonteRecorrente from "../../../database/model/FonteRecorrente";
import { lancamentoRepository } from "../../../repositories/LancamentoRepository";
import Lancamento from "../../../database/model/Lancamento";
import {
  gerarCompetencia,
  gerarMesesDoAno,
} from "../../../helpers/manipular-meses";
import { useTypedNavigation } from "../../../navigation/types";
import { calcularValorMes } from "../../../helpers/calculos";

type DashboardMes = {
  saldo: number;
  gastos: number;
  faltaPagar: number;
};

type DashboardData = Record<string, DashboardMes>;

export default function useDashboardScreenViewModel() {
  const navigation = useTypedNavigation();

  const [fontes, setFontes] = useState<FonteRecorrente[]>([]);
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);

  const [loading, setLoading] = useState<{
    fontes: boolean;
    lancamentos: boolean;
  }>({
    fontes: false,
    lancamentos: false,
  });

  const isLoading = Object.values(loading).every(Boolean);

  const meses = gerarMesesDoAno();
  const dashboard: DashboardData = {};

  meses.forEach((competencia) => {
    dashboard[competencia] = calcularValorMes(competencia, lancamentos, fontes);
  });

  const irParaDetalhesDoMes = (competencia: string) => {
    navigation.navigate("DetalhesMesScreen", { competencia });
  };

  const getMesVigente = () => {
    const competenciaVigente = gerarCompetencia(new Date());
    return {
      ...dashboard[competenciaVigente],
      competencia: competenciaVigente,
    };
  };

  const getMeses = () => {
    const competenciaVigente = gerarCompetencia(new Date());

    const competencias = Object.keys(dashboard);

    const competenciasFuturas = competencias.filter(
      (competencia) => competencia !== competenciaVigente
    );

    return competenciasFuturas.map((key) => ({
      ...dashboard[key],
      competencia: key,
    }));
  };

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

    const lancamentoSubscription = lancamentoObsersable.subscribe(
      (lancamentos) => {
        setLancamentos(lancamentos);
        setLoading((prev) => ({ ...prev, lancamentos: false }));
      }
    );

    return () => {
      fonteRecorrenteSubscription.unsubscribe();
      lancamentoSubscription.unsubscribe();
    };
  }, []);

  return {
    mesVigente: getMesVigente(),
    meses: getMeses(),
    isLoading,
    irParaDetalhesDoMes,
  };
}
