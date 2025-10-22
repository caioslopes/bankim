import { useEffect, useRef, useState } from "react";
import FonteRecorrente from "../../../database/model/FonteRecorrente";
import Lancamento from "../../../database/model/Lancamento";
import { fonteRecorrenteRepository } from "../../../repositories/FonteRecorrenteRepository";
import { lancamentoRepository } from "../../../repositories/LancamentoRepository";
import { calcularValorMes } from "../../../helpers/calculos";
import Cartao from "../../../database/model/Cartao";
import { cartaoRepository } from "../../../repositories/CartaoRepository";

export type DetalhesMesScreenViewModelProps = {
  competencia: string;
};

export default function useDetalhesMesScreenViewModel({
  competencia,
}: DetalhesMesScreenViewModelProps) {
  const [detalhesMes, setDetalhesMes] = useState<{
    faltaPagar: number;
    saldo: number;
    gastos: number;
  }>({
    faltaPagar: 0,
    saldo: 0,
    gastos: 0,
  });
  const [fontes, setFontes] = useState<FonteRecorrente[]>([]);
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [cartoes, setCartoes] = useState<Cartao[]>([]);

  const [loading, setLoading] = useState<{
    fontes: boolean;
    lancamentos: boolean;
    cartoes: boolean;
  }>({
    fontes: false,
    lancamentos: false,
    cartoes: false,
  });

  const isLoading = Object.values(loading).every(Boolean);

  const carregarDetalhesMes = () => {
    const detalhesMes = calcularValorMes(competencia, lancamentos, fontes);
    setDetalhesMes(detalhesMes);
  };

  const carregarCartoes = async () => {
    try {
      const cartoes = await cartaoRepository.getAll();
      setCartoes(cartoes);
      setLoading((prev) => ({ ...prev, cartoes: false }));
    } catch (error) {}
  };

  useEffect(() => {
    setLoading({ fontes: true, lancamentos: true, cartoes: true });

    carregarCartoes();

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

  useEffect(() => {
    if (!isLoading) {
      carregarDetalhesMes();
    }
  }, [isLoading]);

  return {
    isLoading,
    ...detalhesMes,
    cartoes,
  };
}
