import * as yup from "yup";
import { useTypedNavigation } from "../../../navigation/types";
import { useEffect, useState } from "react";
import { TipoMovimentoEnum } from "../../../database/model/enums/TipoMovimentoEnum";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateLancamento,
  lancamentoRepository,
} from "../../../repositories/LancamentoRepository";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { gerarCompetencia } from "../../../helpers/manipular-meses";
import Cartao from "../../../database/model/Cartao";
import { cartaoRepository } from "../../../repositories/CartaoRepository";
import { EstadoMovimentoEnum } from "../../../database/model/enums/EstadoMovimentoEnum";

export type FormValues = {
  descricao: string;
  valor: string;
  cartaoId?: string;
};

const schema = yup.object({
  descricao: yup.string().required("A descrição é obrigatória."),
  valor: yup
    .string()
    .matches(/^\d+([.,]\d{1,2})?$/, "Digite um valor válido (ex: 100,00).")
    .required("O valor é obrigatório."),
});

export default function useNovoLancamentoScreenViewModel() {
  const navigation = useTypedNavigation();

  const [tipoMovimento, setTipoMovimento] = useState<TipoMovimentoEnum>(
    TipoMovimentoEnum.DESPESA
  );
  const [cartoes, setCartoes] = useState<Cartao[]>([]);
  const [data, setData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [loading, setLoading] = useState<{
    cartoes: boolean;
  }>({
    cartoes: false,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { descricao: "", valor: "", cartaoId: undefined },
  });

  const carregarCartoes = async () => {
    try {
      const cartoes = await cartaoRepository.getAll();
      setCartoes(cartoes);
      setLoading((prev) => ({ ...prev, cartoes: false }));
    } catch (error) {}
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || data;
    setShowDatePicker(Platform.OS === "ios");
    setData(currentDate);
  };

  const onSubmit = async (values: FormValues) => {
    const { valor, descricao, cartaoId } = values;

    try {
      await lancamentoRepository.create({
        descricao,
        tipoMovimento,
        valor: Number(valor),
        dataVencimento: data,
        competencia: gerarCompetencia(data),
        cartaoId: cartaoId,
        estadoMovimento: EstadoMovimentoEnum.FIXA,
      } as CreateLancamento);
    } catch (error) {
      console.log(error);
    }

    reset();
    navigation.navigate("DashboardScreen");
  };

  useEffect(() => {
    carregarCartoes();
  }, []);

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,

    tipoMovimento,
    setTipoMovimento,

    data,
    showDatePicker,
    setShowDatePicker,
    onDateChange,

    cartoes,

    onSubmit,
  };
}
