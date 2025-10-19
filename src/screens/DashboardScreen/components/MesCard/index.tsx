import { StyleSheet, View } from "react-native";
import Text from "../../../../components/Text";
import { desestruturarCompetencia } from "../../../../helpers/manipular-meses";

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
    <View>
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
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
