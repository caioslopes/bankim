import { StyleSheet, View } from "react-native";
import Text from "../../../../components/Text";
import { desestruturarCompetencia } from "../../../../helpers/manipular-meses";
import Theme from "../../../../theme/theme";

type Props = {
  mesInfo: {
    competencia: string;
    saldo: number;
    faltaPagar: number;
    gastos: number;
  };
};

export default function MesCard({ mesInfo }: Props) {
  const { competencia, saldo, faltaPagar, gastos } = mesInfo;
  const data = desestruturarCompetencia(competencia);

  return (
    <View style={styles.card}>
      <View style={styles.headerCard}>
        <Text style={{ fontWeight: 600 }}>{data.mes}</Text>
        <Text style={{ fontWeight: 600 }}>{data.ano}</Text>
      </View>
      <View style={styles.contentCard}>
        <Text>R$ {gastos}</Text>
        <Text>R$ {faltaPagar}</Text>
        <Text>R$ {saldo}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Theme.colors.border,
    borderRadius: Theme.radius.medium,
    padding: Theme.space.md,
  },
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
