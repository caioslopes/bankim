import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import withObservables from "@nozbe/with-observables";
import { Q } from "@nozbe/watermelondb";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { collections } from "../../database";
import Lancamento from "../../database/model/Lancamento";

const MesCardBase = ({
  monthDate,
  lancamentos,
}: {
  monthDate: Date;
  lancamentos: Lancamento[];
}) => {
  const { totalRendas, totalDespesas, saldo } = useMemo(() => {
    let rendas = 0;
    let despesas = 0;

    lancamentos.forEach((lancamento) => {
      if (lancamento.valor > 0) {
        rendas += lancamento.valor;
      } else {
        despesas += lancamento.valor;
      }
    });

    return {
      totalRendas: rendas,
      totalDespesas: despesas,
      saldo: rendas + despesas,
    };
  }, [lancamentos]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const mesAnoFormatado = format(monthDate, "MMMM 'de' yyyy", {
    locale: ptBR,
  });

  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.cardTitle}>{mesAnoFormatado}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Entradas:</Text>
        <Text style={[styles.value, styles.renda]}>
          {formatCurrency(totalRendas)}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Saídas:</Text>
        <Text style={[styles.value, styles.despesa]}>
          {formatCurrency(totalDespesas)}
        </Text>
      </View>

      <View style={[styles.row, styles.saldoRow]}>
        <Text style={[styles.label, styles.saldoLabel]}>Saldo do Mês:</Text>
        <Text
          style={[
            styles.value,
            styles.saldoValue,
            saldo >= 0 ? styles.renda : styles.despesa,
          ]}
        >
          {formatCurrency(saldo)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const enhance = withObservables(
  ["monthDate"],
  ({ monthDate }: { monthDate: Date }) => {
    const inicioDoMes = startOfMonth(monthDate);
    const fimDoMes = endOfMonth(monthDate);

    return {
      lancamentos: collections.lancamentos
        .query(
          Q.where(
            "data_vencimento",
            Q.between(inicioDoMes.getTime(), fimDoMes.getTime())
          )
        )
        .observe(),
    };
  }
);

export default enhance(MesCardBase);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textTransform: "capitalize",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
  },
  renda: {
    color: "#28a745",
  },
  despesa: {
    color: "#dc3545",
  },
  saldoRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  saldoLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  saldoValue: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
