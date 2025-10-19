import { useEffect, useState } from "react";
import { fonteRecorrenteRepository } from "../../../repositories/FonteRecorrenteRepository";
import FonteRecorrente from "../../../database/model/FonteRecorrente";
import { lancamentoRepository } from "../../../repositories/LancamentoRepository";
import Lancamento from "../../../database/model/Lancamento";

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
    fontes,
    lancamentos,
    isLoading: Object.values(loading).every(Boolean),
  };
}
