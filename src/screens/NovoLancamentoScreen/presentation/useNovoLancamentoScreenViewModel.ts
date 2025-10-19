import * as yup from "yup";
import { useTypedNavigation } from "../../../navigation/types";
import { useState } from "react";
import { TipoMovimentoEnum } from "../../../database/model/enums/TipoMovimentoEnum";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateLancamento,
  lancamentoRepository,
} from "../../../repositories/LancamentoRepository";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Platform } from "react-native";

export type FormValues = {
  descricao: string;
  valor: string;
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
  const [data, setData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { descricao: "", valor: "" },
  });

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || data;
    setShowDatePicker(Platform.OS === "ios");
    setData(currentDate);
  };

  const onSubmit = async (values: FormValues) => {
    const { valor, descricao } = values;

    lancamentoRepository.create({
      descricao,
      tipoMovimento,
      valor: Number(valor),
      dataVencimento: data,
    } as CreateLancamento);

    reset();
    navigation.navigate("DashboardScreen");
  };

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

    onSubmit,
  };
}
