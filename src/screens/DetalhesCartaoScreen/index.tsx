import { View } from "react-native";
import SafeScreen from "../../components/SafeScreen";
import Text from "../../components/Text";
import { RootStackScreenProps } from "../../navigation/types";
import useDetalhesCartaoScreenViewModel from "./presentation/useDetalhesCartaoScreenViewModel";

type Props = RootStackScreenProps<"DetalhesCartaoScreen">;

export default function DetalhesCartaoScreen({ route }: Props) {
  const id = route.params.id;
  const competencia = route.params.competencia;

  const { lancamentos, isLoading } = useDetalhesCartaoScreenViewModel({
    id,
    competencia,
  });

  return (
    <SafeScreen>
      <View>
        <Text>DetalhesCartaoScreen</Text>
        {lancamentos.map((lancamento) => (
          <View key={lancamento.id}>
            <Text>{lancamento.descricao}</Text>
            <Text>{lancamento.tipoMovimento}</Text>
            <Text>{lancamento.estadoMovimento}</Text>
            <Text>{lancamento.valor}</Text>
          </View>
        ))}
      </View>
    </SafeScreen>
  );
}
