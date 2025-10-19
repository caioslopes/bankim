import { FlatList } from "react-native";
import FloatingActionButtons from "../../components/FloatingActionButtons";
import { RootStackScreenProps } from "../../navigation/types";
import SafeScreen from "../../components/SafeScreen";
import MesCard from "./components/MesCard";
import useDashboardScreenViewModel from "./presentation/useDashboardScreenViewModel";
import Text from "../../components/Text";

type Props = RootStackScreenProps<"DashboardScreen">;

export default function DashboardScreen({ navigation }: Props) {
  const { fontes, lancamentos } = useDashboardScreenViewModel();

  return (
    <SafeScreen>
      <Text>{JSON.stringify(fontes)}</Text>
      <Text>{JSON.stringify(lancamentos)}</Text>
      {/* <FlatList
        data={fontes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MesCard />}
      /> */}
      <FloatingActionButtons
        options={[
          {
            icon: "pencil",
            label: "Despesa recorrente",
            onPress: () =>
              navigation.navigate("AdicionarFonteRecorrenteScreen"),
          },
        ]}
      />
    </SafeScreen>
  );
}
