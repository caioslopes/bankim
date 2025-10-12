import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Button,
} from "react-native";
import withObservables from "@nozbe/with-observables";

import { collections } from "../../database";
import Lancamento from "../../database/model/Lancamento";
import LancamentoItem from "./components/LancamentoItem";

const ResumoAnual = ({
  navigation,
  lancamentos,
}: {
  navigation: any;
  lancamentos: Lancamento[];
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={() => {
          navigation.navigate("NovoLancamento");
        }}
        title="Novo"
      />
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
