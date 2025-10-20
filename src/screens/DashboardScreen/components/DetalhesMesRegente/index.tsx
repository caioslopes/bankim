import { StyleSheet, View } from "react-native";
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
};

export default function DetalhesMesRegente({ mesInfo }: Props) {
  const { competencia, saldo, faltaPagar, gastos } = mesInfo;
  const data = desestruturarCompetencia(competencia);

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <Text
          style={{
            fontFamily: Theme.font.family.bold,
            color: Theme.colors.textInverse,
          }}
        >
          {data.mes}
        </Text>
        <Text
          style={{
            fontFamily: Theme.font.family.bold,
            color: Theme.colors.textInverse,
          }}
        >
          {data.ano}
        </Text>
      </View>
      <View style={styles.contentCard}>
        <View style={styles.valueCard}>
          <Text
            style={{
              color: Theme.colors.textInverse,
            }}
          >
            gastos
          </Text>
          <Text
            style={{
              color: Theme.colors.textInverse,
              fontFamily: Theme.font.family.bold,
            }}
          >
            {formatarValorMonetario(gastos)}
          </Text>
        </View>

        <View style={styles.valueCard}>
          <Text
            style={{
              color: Theme.colors.textInverse,
            }}
          >
            a pagar
          </Text>
          <Text
            style={{
              color: Theme.colors.textInverse,
              fontFamily: Theme.font.family.bold,
            }}
          >
            {formatarValorMonetario(faltaPagar)}
          </Text>
        </View>

        <View style={styles.valueCard}>
          <Text
            style={{
              color: Theme.colors.textInverse,
            }}
          >
            saldo
          </Text>
          <Text
            style={{
              color: Theme.colors.textInverse,
              fontFamily: Theme.font.family.bold,
            }}
          >
            {formatarValorMonetario(saldo)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Theme.space.lg,
  },
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  valueCard: {
    paddingVertical: Theme.space.md,
    borderRadius: Theme.radius.medium,
  },
});
