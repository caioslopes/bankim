import { StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../../../../components/Text";
import { desestruturarCompetencia } from "../../../../helpers/manipular-meses";
import Theme from "../../../../theme/theme";
import { formatarValorMonetario } from "../../../../helpers/formatadores";

type Props = {
  mesInfo: {
    competencia: string;
    saldo: number;
    faltaPagar: number;
    gastos: number;
  };
  irParaDetalhesDoMes: (competencia: string) => void;
};

export default function MesCard({ mesInfo, irParaDetalhesDoMes }: Props) {
  const { competencia, saldo, faltaPagar, gastos } = mesInfo;
  const data = desestruturarCompetencia(competencia);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        irParaDetalhesDoMes(competencia);
      }}
    >
      <View style={styles.headerCard}>
        <Text style={{ fontWeight: 600 }}>{data.mes}</Text>
        <Text style={{ fontWeight: 600 }}>{data.ano}</Text>
      </View>
      <View style={styles.contentCard}>
        <View
          style={[styles.valueCard, { backgroundColor: Theme.colors.tertiary }]}
        >
          <Text>gastos</Text>
          <Text
            style={{
              fontFamily: Theme.font.family.bold,
            }}
          >
            {formatarValorMonetario(gastos)}
          </Text>
        </View>
        {/* <View
          style={[
            styles.valueCard,
            { backgroundColor: Theme.colors.secondary },
          ]}
        >
          <Text>a pagar</Text>
          <Text
            style={{
              fontFamily: Theme.font.family.bold,
            }}
          >
            {formatarValorMonetario(faltaPagar)}
          </Text>
        </View> */}
        <View
          style={[
            styles.valueCard,
            { backgroundColor: Theme.colors.softGreen },
          ]}
        >
          <Text>saldo</Text>
          <Text
            style={{
              fontFamily: Theme.font.family.bold,
            }}
          >
            {formatarValorMonetario(saldo)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Theme.colors.border,
    borderRadius: Theme.radius.large,
    padding: Theme.space.md,
    gap: Theme.space.sm,
  },
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Theme.space.xs,
  },
  valueCard: {
    padding: Theme.space.md,
    borderRadius: Theme.radius.medium,
    flex: 1,
  },
});
