import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { collections, database } from "../../database";

type TipoMovimento = "DESPESA" | "RENDA";
type TipoDespesa = "UNICA" | "FIXA" | "VARIAVEL";

export default function NovoLancamentoScreen() {
  const navigation = useNavigation();

  const [tipoMovimento, setTipoMovimento] = useState<TipoMovimento>("DESPESA");
  const [tipoDespesa, setTipoDespesa] = useState<TipoDespesa>("UNICA");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState(new Date());
  const [diaVencimento, setDiaVencimento] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || data;
    setShowDatePicker(Platform.OS === "ios");
    setData(currentDate);
  };

  const handleSalvar = async () => {
    const valorNumerico = parseFloat(valor.replace(",", "."));

    if (
      !descricao.trim() ||
      !valor.trim() ||
      isNaN(valorNumerico) ||
      valorNumerico <= 0
    ) {
      Alert.alert(
        "Erro de Validação",
        "Descrição e Valor são obrigatórios e devem ser válidos."
      );
      return;
    }

    try {
      await database.write(async () => {
        if (tipoMovimento === "RENDA" || tipoDespesa === "UNICA") {
          await collections.lancamentos.create((lancamento) => {
            lancamento.descricao = descricao;
            lancamento.valor =
              tipoMovimento === "DESPESA" ? valorNumerico * -1 : valorNumerico;
            lancamento.data_vencimento = data;
            lancamento.tipo = tipoMovimento;
            lancamento.pago = false;
          });
        } else {
          const diaNumerico = parseInt(diaVencimento, 10);
          if (isNaN(diaNumerico) || diaNumerico < 1 || diaNumerico > 31) {
            Alert.alert(
              "Erro de Validação",
              "O dia de vencimento para despesas recorrentes é obrigatório e deve ser entre 1 e 31."
            );
            return;
          }

          await collections.fontesRecorrentes.create((fonte) => {
            fonte.descricao = descricao;
            fonte.tipo =
              tipoDespesa === "FIXA" ? "DESPESA_FIXA" : "DESPESA_VARIAVEL";
            fonte.valor_padrao = valorNumerico;
            fonte.dia_do_mes = diaNumerico;
          });
        }
      });

      Alert.alert("Sucesso!", "Seu registro foi salvo.");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro ao Salvar",
        "Ocorreu um erro inesperado. Tente novamente."
      );
    }
  };

  const getValorLabel = () => {
    if (tipoMovimento === "RENDA") return "Valor da Renda (R$)";
    if (tipoDespesa === "FIXA") return "Valor Fixo (R$)";
    if (tipoDespesa === "VARIAVEL") return "Valor Médio (para previsão) (R$)";
    return "Valor da Despesa (R$)";
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View style={styles.segmentControl}>
        <TouchableOpacity
          style={[
            styles.segmentButton,
            tipoMovimento === "DESPESA" && styles.segmentButtonActive,
          ]}
          onPress={() => setTipoMovimento("DESPESA")}
        >
          <Text
            style={[
              styles.segmentText,
              tipoMovimento === "DESPESA" && styles.segmentTextActive,
            ]}
          >
            Despesa
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.segmentButton,
            tipoMovimento === "RENDA" && styles.segmentButtonActive,
          ]}
          onPress={() => setTipoMovimento("RENDA")}
        >
          <Text
            style={[
              styles.segmentText,
              tipoMovimento === "RENDA" && styles.segmentTextActive,
            ]}
          >
            Renda
          </Text>
        </TouchableOpacity>
      </View>

      {tipoMovimento === "DESPESA" && (
        <>
          <Text style={styles.label}>Tipo de Despesa</Text>
          <View style={[styles.segmentControl, { backgroundColor: "#e9ecef" }]}>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                tipoDespesa === "UNICA" && styles.segmentButtonActive,
              ]}
              onPress={() => setTipoDespesa("UNICA")}
            >
              <Text
                style={[
                  styles.segmentText,
                  tipoDespesa === "UNICA" && styles.segmentTextActive,
                ]}
              >
                Única
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                tipoDespesa === "FIXA" && styles.segmentButtonActive,
              ]}
              onPress={() => setTipoDespesa("FIXA")}
            >
              <Text
                style={[
                  styles.segmentText,
                  tipoDespesa === "FIXA" && styles.segmentTextActive,
                ]}
              >
                Fixa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                tipoDespesa === "VARIAVEL" && styles.segmentButtonActive,
              ]}
              onPress={() => setTipoDespesa("VARIAVEL")}
            >
              <Text
                style={[
                  styles.segmentText,
                  tipoDespesa === "VARIAVEL" && styles.segmentTextActive,
                ]}
              >
                Variável
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Conta de Internet"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>{getValorLabel()}</Text>
      <TextInput
        style={styles.input}
        placeholder="100,00"
        keyboardType="decimal-pad"
        value={valor}
        onChangeText={setValor}
      />

      {tipoMovimento === "RENDA" || tipoDespesa === "UNICA" ? (
        <>
          <Text style={styles.label}>Data de Vencimento</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{data.toLocaleDateString("pt-BR")}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>Dia do Vencimento</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 10"
            keyboardType="number-pad"
            maxLength={2}
            value={diaVencimento}
            onChangeText={setDiaVencimento}
          />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#495057",
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
    borderColor: "#ced4da",
  },
  segmentControl: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    padding: 2,
  },
  segmentButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 7,
  },
  segmentButtonActive: {
    backgroundColor: "#007bff",
  },
  segmentText: {
    fontSize: 15,
    color: "#333",
  },
  segmentTextActive: {
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
