import FloatingActionButtons from "../../components/FloatingActionButtons";
import { RootStackScreenProps } from "../../navigation/types";
import SafeScreen from "../../components/SafeScreen";
import useDashboardScreenViewModel from "./presentation/useDashboardScreenViewModel";
import Text from "../../components/Text";
import DetalhesMesRegente from "./components/DetalhesMesRegente";
import { View } from "react-native";

type Props = RootStackScreenProps<"DashboardScreen">;

export default function DashboardScreen({ navigation }: Props) {
  const { fontes, lancamentos } = useDashboardScreenViewModel();

  return (
    <SafeScreen>
      <DetalhesMesRegente />
      <Text style={{ fontWeight: 600 }}>Fontes recorrentes</Text>
      {fontes.map((fonte) => (
        <View key={fonte.id}>
          <Text>{fonte.descricao}</Text>
          <Text>{fonte.tipoMovimento}</Text>
          <Text>{fonte.valor}</Text>
        </View>
      ))}

      <Text style={{ marginTop: 40, fontWeight: 600 }}>Lançamentos</Text>
      {lancamentos.map((lancamento) => (
        <View key={lancamento.id}>
          <Text>{lancamento.descricao}</Text>
          <Text>{lancamento.tipoMovimento}</Text>
          <Text>{lancamento.valor}</Text>
        </View>
      ))}

      <FloatingActionButtons
        options={[
          {
            icon: "pencil",
            label: "Movimentação recorrente",
            onPress: () => navigation.navigate("NovaFonteRecorrenteScreen"),
          },
          {
            icon: "pencil",
            label: "Lançamentos",
            onPress: () => navigation.navigate("NovoLancamentoScreen"),
          },
        ]}
      />
    </SafeScreen>
  );
}
