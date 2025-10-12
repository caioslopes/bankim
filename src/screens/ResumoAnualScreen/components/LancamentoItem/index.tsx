import { StyleSheet, Text, View } from "react-native";
import Lancamento from "../../../../database/model/Lancamento";

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

export default LancamentoItem;

const styles = StyleSheet.create({
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
});
