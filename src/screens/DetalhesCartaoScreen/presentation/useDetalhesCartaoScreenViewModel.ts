import { useEffect, useState } from "react";
import Lancamento from "../../../database/model/Lancamento";
import { lancamentoRepository } from "../../../repositories/LancamentoRepository";

export type DetalhesCartaoScreenViewModelProps = {
  id: string;
  competencia: string;
};

export default function useDetalhesCartaoScreenViewModel({
  id,
  competencia,
}: DetalhesCartaoScreenViewModelProps) {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);

  const [loading, setLoading] = useState<{
    lancamentos: boolean;
  }>({
    lancamentos: false,
  });

  const isLoading = Object.values(loading).every(Boolean);

  const carregarLancamentosCartao = async () => {
    try {
      setLoading({ lancamentos: true });
      const lancamentos =
        await lancamentoRepository.getAllByCartaoIdAndCompetencia(
          id,
          competencia
        );
      console.log(lancamentos);

      setLancamentos(lancamentos);
    } catch (error) {
    } finally {
      setLoading({ lancamentos: false });
    }
  };

  useEffect(() => {
    carregarLancamentosCartao();
  }, []);

  return {
    lancamentos,
    isLoading,
  };
}
