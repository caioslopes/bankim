import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTypedNavigation } from "../../../navigation/types";
import {
  cartaoRepository,
  CreateCartao,
} from "../../../repositories/CartaoRepository";

export type FormValues = {
  nome: string;
  emissor: string;
  diaFechamento: string;
  diaVencimento: string;
};

const schema = yup.object({
  nome: yup.string().required("O nome do cartão é obrigatório."),
  emissor: yup.string().required("O emissor é obrigatório."),
  diaFechamento: yup
    .string()
    .required("O dia de fechamento é obrigatório.")
    .matches(/^(?:[1-9]|[12]\d|3[01])$/, "Dia deve ser entre 1 e 31."),
  diaVencimento: yup
    .string()
    .required("O dia de vencimento é obrigatório.")
    .matches(/^(?:[1-9]|[12]\d|3[01])$/, "Dia deve ser entre 1 e 31."),
});

export default function useNovoCartaoScreenViewModel() {
  const navigation = useTypedNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: "",
      emissor: "",
      diaFechamento: "",
      diaVencimento: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const { nome, emissor, diaFechamento, diaVencimento } = values;

    cartaoRepository.create({
      nome,
      emissor,
      diaFechamento: Number(diaFechamento),
      diaVencimento: Number(diaVencimento),
    } as CreateCartao);

    reset();
    navigation.navigate("DashboardScreen");
  };

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  };
}
