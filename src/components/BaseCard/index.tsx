import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import Theme from "../../theme/theme";
import Cartao from "../../database/model/Cartao";

export type BaseCardProps = {
  cartaoInfo: Cartao;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
};

export default function BaseCard({
  cartaoInfo,
  backgroundColor = "#333",
  textColor = "#fff",
  style,
}: BaseCardProps) {
  const { nome, emissor, diaFechamento, diaVencimento } = cartaoInfo;
  return (
    <View style={[styles.card, { backgroundColor }, style]}>
      <View>
        <Text style={[styles.nome, { color: textColor }]}>{nome}</Text>
        <Text style={[styles.emissor, { color: textColor }]}>{emissor}</Text>
      </View>

      <View style={styles.linha}>
        <Text style={[styles.label, { color: textColor }]}>Fechamento:</Text>
        <Text style={[styles.valor, { color: textColor }]}>
          {diaFechamento}
        </Text>
      </View>

      <View style={styles.linha}>
        <Text style={[styles.label, { color: textColor }]}>Vencimento:</Text>
        <Text style={[styles.valor, { color: textColor }]}>
          {diaVencimento}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Theme.radius.large,
    padding: Theme.space.lg,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  nome: {
    fontFamily: Theme.font.family.bold,
    fontSize: 18,
  },
  emissor: {
    fontFamily: Theme.font.family.regular,
    fontSize: 14,
    opacity: 0.9,
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Theme.space.sm,
  },
  label: {
    fontFamily: Theme.font.family.regular,
  },
  valor: {
    fontFamily: Theme.font.family.regular,
  },
});
