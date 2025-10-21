import { StyleSheet, View } from "react-native";
import SafeScreen from "../../components/SafeScreen";
import Text from "../../components/Text";
import { RootStackScreenProps } from "../../navigation/types";
import useDetalhesMesScreenViewModel from "./presentation/useDetalhesMesScreenViewModel";
import Theme from "../../theme/theme";
import { formatarValorMonetario } from "../../helpers/formatadores";
import { desestruturarCompetencia } from "../../helpers/manipular-meses";

type Props = RootStackScreenProps<"DetalhesMesScreen">;

export default function DetalhesMesScreen({ route }: Props) {
  const competencia = route.params?.competencia;
  const data = desestruturarCompetencia(competencia);
  const { gastos, faltaPagar, saldo, isLoading } =
    useDetalhesMesScreenViewModel({ competencia });

  return (
    <SafeScreen>
      <View style={{ padding: Theme.space.lg }}>
        <Text>{data.mes}</Text>
        <View style={styles.contentCard}>
          <View
            style={[
              styles.valueCard,
              { backgroundColor: Theme.colors.tertiary },
            ]}
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
          <View
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
          </View>
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
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  contentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  valueCard: {
    padding: Theme.space.md,
    borderRadius: Theme.radius.medium,
  },
});
