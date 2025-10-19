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
      {fontes.map((fonte) => (
        <View key={fonte.id}>
          <Text>{fonte.descricao}</Text>
          <Text>{fonte.tipoMovimento}</Text>
          <Text>{fonte.valor}</Text>
        </View>
      ))}
      <FloatingActionButtons
        options={[
          {
            icon: "pencil",
            label: "Cadastrar movimentação",
            onPress: () => navigation.navigate("NovaFonteRecorrenteScreen"),
          },
        ]}
      />
    </SafeScreen>
  );
}
