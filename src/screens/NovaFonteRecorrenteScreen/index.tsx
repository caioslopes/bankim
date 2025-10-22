import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Controller } from "react-hook-form";
import { TipoMovimentoEnum } from "../../database/model/enums/TipoMovimentoEnum";
import { EstadoMovimentoEnum } from "../../database/model/enums/EstadoMovimentoEnum";
import SafeScreen from "../../components/SafeScreen";
import { useNovaFonteRecorrenteScreenViewModel } from "./presentation/useAdicionarFonteRecorrenteScreenViewModel";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function NovaFonteRecorrenteScreen() {
  const {
    control,
    handleSubmit,
    errors,
    isSubmitting,

    tipoMovimento,
    setTipoMovimento,
    estadoMovimento,
    setEstadoMovimento,

    data,
    showDatePicker,
    setShowDatePicker,
    onDateChange,

    onSubmit,
    getValorLabel,
  } = useNovaFonteRecorrenteScreenViewModel();

  return (
    <SafeScreen>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={styles.label}>Tipo da movimentação</Text>
        <View style={styles.segmentControl}>
          {(Object.keys(TipoMovimentoEnum) as TipoMovimentoEnum[]).map(
            (tipo) => (
              <TouchableOpacity
                key={tipo}
                style={[
                  styles.segmentButton,
                  tipoMovimento === tipo && styles.segmentButtonActive,
                ]}
                onPress={() => setTipoMovimento(tipo)}
              >
                <Text
                  style={[
                    styles.segmentText,
                    tipoMovimento === tipo && styles.segmentTextActive,
                  ]}
                >
                  {tipo === TipoMovimentoEnum.DESPESA ? "Despesa" : "Renda"}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        <Text style={styles.label}>Movimentação</Text>
        <View style={[styles.segmentControl, { backgroundColor: "#e9ecef" }]}>
          {(Object.keys(EstadoMovimentoEnum) as EstadoMovimentoEnum[]).map(
            (tipo) => (
              <TouchableOpacity
                key={tipo}
                style={[
                  styles.segmentButton,
                  estadoMovimento === tipo && styles.segmentButtonActive,
                ]}
                onPress={() => setEstadoMovimento(tipo)}
              >
                <Text
                  style={[
                    styles.segmentText,
                    estadoMovimento === tipo && styles.segmentTextActive,
                  ]}
                >
                  {tipo === "FIXA" ? "Fixa" : "Variável"}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        <Text style={styles.label}>Descrição</Text>
        <Controller
          control={control}
          name="descricao"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.descricao && { borderColor: "red" }]}
              placeholder="Ex: Conta de Internet"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.descricao && (
          <Text style={styles.error}>{errors.descricao.message}</Text>
        )}

        <Text style={styles.label}>{getValorLabel()}</Text>
        <Controller
          control={control}
          name="valor"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.valor && { borderColor: "red" }]}
              placeholder="100,00"
              keyboardType="decimal-pad"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.valor && (
          <Text style={styles.error}>{errors.valor.message}</Text>
        )}

        <Text style={styles.label}>Dia do Vencimento</Text>
        <Controller
          control={control}
          name="diaVencimento"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[
                styles.input,
                errors.diaVencimento && { borderColor: "red" },
              ]}
              placeholder="Ex: 10"
              keyboardType="number-pad"
              maxLength={2}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.diaVencimento && (
          <Text style={styles.error}>{errors.diaVencimento.message}</Text>
        )}

        <Text style={styles.label}>Vigente até</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => {
            setShowDatePicker(true);
          }}
        >
          <Text>{data.toLocaleDateString("pt-BR")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isSubmitting && { opacity: 0.7 }]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Salvando..." : "Salvar"}
          </Text>
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
    </SafeScreen>
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
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ced4da",
  },
  error: {
    color: "red",
    marginBottom: 10,
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
