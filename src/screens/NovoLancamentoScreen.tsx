import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { collections, database } from "../database";

export default function NovoLancamentoScreen() {
  const navigation = useNavigation();

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("DESPESA");
  const [data, setData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || data;
    setShowDatePicker(Platform.OS === "ios");
    setData(currentDate);
  };

  const handleSalvar = async () => {
    if (!descricao.trim() || !valor.trim()) {
      Alert.alert("Erro", "Descrição e Valor são obrigatórios.");
      return;
    }

    const valorNumerico = parseFloat(valor.replace(",", "."));
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert("Erro", "O valor inserido é inválido.");
      return;
    }

    try {
      await database.write(async () => {
        await collections.lancamentos.create((novoLancamento) => {
          novoLancamento.descricao = descricao;
          novoLancamento.valor =
            tipo === "DESPESA" ? valorNumerico * -1 : valorNumerico;
          novoLancamento.data_vencimento = data;
          novoLancamento.tipo = tipo;
          novoLancamento.pago = false;
        });
      });

      Alert.alert("Sucesso!", "Lançamento salvo.");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro ao Salvar", "Não foi possível salvar o lançamento.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tipoContainer}>
        <TouchableOpacity
          style={[
            styles.tipoButton,
            tipo === "DESPESA" && styles.tipoButtonActive,
          ]}
          onPress={() => setTipo("DESPESA")}
        >
          <Text
            style={[
              styles.tipoText,
              tipo === "DESPESA" && styles.tipoTextActive,
            ]}
          >
            Despesa
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tipoButton,
            tipo === "RENDA" && styles.tipoButtonActive,
          ]}
          onPress={() => setTipo("RENDA")}
        >
          <Text
            style={[styles.tipoText, tipo === "RENDA" && styles.tipoTextActive]}
          >
            Renda
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Conta de Internet"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        placeholder="100,00"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      <Text style={styles.label}>Data de Vencimento</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{data.toLocaleDateString("pt-BR")}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Salvar Lançamento</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={data}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  tipoContainer: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  tipoButton: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  tipoButtonActive: {
    backgroundColor: "#007bff",
  },
  tipoText: {
    fontSize: 16,
    color: "#333",
  },
  tipoTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
