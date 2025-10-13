import React, { useMemo } from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { startOfMonth, addMonths } from "date-fns";
import MesCard from "../../components/MesCard";
import FloatingActionButton from "../../components/FloatActionButton";
import { RootStackScreenProps } from "../../navigation/types";

type Props = RootStackScreenProps<"ResumoAnual">;

export default function ResumoAnualScreen({ navigation }: Props) {
  const meses = useMemo(() => {
    const hoje = new Date();
    const primeiroMes = startOfMonth(hoje);
    return Array.from({ length: 12 }, (_, i) => addMonths(primeiroMes, i));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={meses}
        keyExtractor={(item) => item.toISOString()}
        renderItem={({ item }) => <MesCard monthDate={item} />}
        contentContainerStyle={styles.list}
      />
      <FloatingActionButton
        actions={[
          {
            onPress: () => navigation.navigate("NovoLancamento"),
            label: "Despesas",
            icon: "file-document-edit-outline",
          },
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    paddingVertical: 8,
  },
});
