import FloatingActionButtons from "../../components/FloatingActionButtons";
import { RootStackScreenProps } from "../../navigation/types";
import SafeScreen from "../../components/SafeScreen";
import useDashboardScreenViewModel from "./presentation/useDashboardScreenViewModel";
import DetalhesMesRegente from "./components/DetalhesMesRegente";
import ListagemMeses from "./components/ListagemMeses";
import Theme from "../../theme/theme";

type Props = RootStackScreenProps<"DashboardScreen">;

export default function DashboardScreen({ navigation }: Props) {
  const { mesVigente, meses } = useDashboardScreenViewModel();

  return (
    <SafeScreen style={{ backgroundColor: Theme.colors.primary }}>
      <DetalhesMesRegente mesInfo={mesVigente} />

      <ListagemMeses meses={meses} />

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
            onPress: () => navigation.navigate("NovoCartaoScreen"),
          },
        ]}
      />
    </SafeScreen>
  );
}
