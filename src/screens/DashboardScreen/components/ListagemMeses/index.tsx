import { FlatList, StyleSheet, View } from "react-native";
import MesCard from "../MesCard";
import Separator from "../../../../components/Separator";
import Theme from "../../../../theme/theme";

type Props = {
  meses: {
    competencia: string;
    saldo: number;
    faltaPagar: number;
    gastos: number;
  }[];
};

export default function ListagemMeses({ meses }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={meses}
        keyExtractor={(item) => item.competencia}
        renderItem={({ item }) => <MesCard mesInfo={item} />}
        contentContainerStyle={{ padding: Theme.space.lg }}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    borderTopLeftRadius: Theme.radius.large,
    borderTopRightRadius: Theme.radius.large,
  },
});
