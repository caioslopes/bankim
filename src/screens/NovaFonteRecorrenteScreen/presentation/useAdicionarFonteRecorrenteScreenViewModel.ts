import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TipoMovimentoEnum } from "../../../database/model/enums/TipoMovimentoEnum";
import { EstadoMovimentoEnum } from "../../../database/model/enums/EstadoMovimentoEnum";
import {
  CreateFonteRecorrente,
  fonteRecorrenteRepository,
} from "../../../repositories/FonteRecorrenteRepository";
import { useTypedNavigation } from "../../../navigation/types";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Platform } from "react-native";

export type FormValues = {
  descricao: string;
  valor: string;
  diaVencimento: string;
};

const schema = yup.object({
  descricao: yup.string().required("A descrição é obrigatória."),
  valor: yup
    .string()
    .matches(/^\d+([.,]\d{1,2})?$/, "Digite um valor válido (ex: 100,00).")
    .required("O valor é obrigatório."),
  diaVencimento: yup
    .string()
    .required("O dia de vencimento é obrigatório.")
    .matches(/^(?:[1-9]|[12]\d|3[01])$/, "Dia deve ser entre 1 e 31."),
});

export function useNovaFonteRecorrenteScreenViewModel() {
  const navigation = useTypedNavigation();

  const [tipoMovimento, setTipoMovimento] = useState<TipoMovimentoEnum>(
    TipoMovimentoEnum.DESPESA
  );
  const [estadoMovimento, setEstadoMovimento] = useState<EstadoMovimentoEnum>(
    EstadoMovimentoEnum.FIXA
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
    defaultValues: { descricao: "", valor: "", diaVencimento: "" },
  });

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || data;
    setShowDatePicker(Platform.OS === "ios");
    setData(currentDate);
  };

  const getValorLabel = () => {
    if (estadoMovimento === EstadoMovimentoEnum.VARIAVEL)
      return "Valor Médio (para previsão) (R$)";
    return "Valor Fixo (R$)";
  };

  const onSubmit = async (values: FormValues) => {
    const { valor, diaVencimento, descricao } = values;

    fonteRecorrenteRepository.create({
      descricao,
      tipoMovimento,
      estadoMovimento,
      diaVencimento: Number(diaVencimento),
      valor: Number(valor),
      vigenteAte: data,
    } as CreateFonteRecorrente);

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
    estadoMovimento,
    setEstadoMovimento,

    data,
    showDatePicker,
    setShowDatePicker,
    onDateChange,

    onSubmit,
    getValorLabel,
  };
}
