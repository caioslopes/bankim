import React from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import withObservables from "@nozbe/with-observables";

import { collections } from "../database";
import Lancamento from "../database/model/Lancamento";

const LancamentoItem = ({ lancamento }: { lancamento: Lancamento }) => {
  const valorFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(lancamento.valor);

  const dataFormatada = new Date(lancamento.data_vencimento).toLocaleDateString(
    "pt-BR"
  );

  return (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemDescricao}>{lancamento.descricao}</Text>
        <Text style={styles.itemData}>{dataFormatada}</Text>
      </View>
      <Text
        style={[
          styles.itemValor,
          lancamento.valor > 0 ? styles.valorRenda : styles.valorDespesa,
        ]}
      >
        {valorFormatado}
      </Text>
    </View>
  );
};

const ResumoAnual = ({ lancamentos }: { lancamentos: Lancamento[] }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={lancamentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LancamentoItem lancamento={item} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum lançamento encontrado.</Text>
            <Text style={styles.emptySubText}>
              Clique em "Novo" para adicionar seu primeiro lançamento!
            </Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <Text style={styles.header}>Meus Lançamentos</Text>
        )}
      />
    </SafeAreaView>
  );
};

const enhance = withObservables([], () => ({
  lancamentos: collections.lancamentos.query().observe(),
}));

export default enhance(ResumoAnual);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    padding: 20,
    paddingBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemDescricao: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemData: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  itemValor: {
    fontSize: 16,
    fontWeight: "bold",
  },
  valorRenda: {
    color: "#28a745",
  },
  valorDespesa: {
    color: "#dc3545",
  },
  emptyContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
  },
});
