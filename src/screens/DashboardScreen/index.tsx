import FloatingActionButtons from "../../components/FloatingActionButtons";
import { RootStackScreenProps } from "../../navigation/types";
import SafeScreen from "../../components/SafeScreen";
import useDashboardScreenViewModel from "./presentation/useDashboardScreenViewModel";
import DetalhesMesRegente from "./components/DetalhesMesRegente";
import { FlatList } from "react-native";
import MesCard from "./components/MesCard";

type Props = RootStackScreenProps<"DashboardScreen">;

export default function DashboardScreen({ navigation }: Props) {
  const { mesVigente, meses } = useDashboardScreenViewModel();

  return (
    <SafeScreen>
      <DetalhesMesRegente mesInfo={mesVigente} />

      <FlatList
        data={meses}
        keyExtractor={(item) => item.competencia}
        renderItem={({ item }) => <MesCard mesInfo={item} />}
      />

      <FloatingActionButtons
        options={[
          {
            icon: "calendar",
            label: "Recorrente",
            onPress: () => navigation.navigate("NovaFonteRecorrenteScreen"),
          },
          {
            icon: "arrow-up",
            label: "Lançamento",
            onPress: () => navigation.navigate("NovoLancamentoScreen"),
          },
          {
            icon: "card",
            label: "Cartão",
            onPress: () => navigation.navigate("NovoLancamentoScreen"),
          },
        ]}
      />
    </SafeScreen>
  );
}
