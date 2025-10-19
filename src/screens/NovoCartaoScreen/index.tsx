import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Controller } from "react-hook-form";
import SafeScreen from "../../components/SafeScreen";
import Text from "../../components/Text";
import useNovoCartaoScreenViewModel from "./presentation/useNovoCartaoScreenViewModel";
import { Picker } from "@react-native-picker/picker";
import { EmissorCartaoEnum } from "../../database/model/enums/EmissorCartaoEnum";

export default function NovoCartaoScreen() {
  const { control, handleSubmit, errors, isSubmitting, onSubmit } =
    useNovoCartaoScreenViewModel();

  return (
    <SafeScreen>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={styles.label}>Nome do cartão</Text>
        <Controller
          control={control}
          name="nome"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.nome && { borderColor: "red" }]}
              placeholder="Ex: Cartão Pessoal"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.nome && <Text style={styles.error}>{errors.nome.message}</Text>}

        <Text style={styles.label}>Emissor</Text>
        <Controller
          control={control}
          name="emissor"
          render={({ field: { onChange, value } }) => (
            <View style={[styles.input, { padding: 0 }]}>
              <Picker selectedValue={value} onValueChange={onChange}>
                <Picker.Item label="Selecione o emissor" value="" />
                {Object.keys(EmissorCartaoEnum).map((e) => (
                  <Picker.Item key={e} label={e} value={e} />
                ))}
              </Picker>
            </View>
          )}
        />
        {errors.emissor && (
          <Text style={styles.error}>{errors.emissor.message}</Text>
        )}

        <Text style={styles.label}>Dia de fechamento</Text>
        <Controller
          control={control}
          name="diaFechamento"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[
                styles.input,
                errors.diaFechamento && { borderColor: "red" },
              ]}
              placeholder="Ex: 10"
              keyboardType="number-pad"
              maxLength={2}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.diaFechamento && (
          <Text style={styles.error}>{errors.diaFechamento.message}</Text>
        )}

        <Text style={styles.label}>Dia de vencimento</Text>
        <Controller
          control={control}
          name="diaVencimento"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[
                styles.input,
                errors.diaVencimento && { borderColor: "red" },
              ]}
              placeholder="Ex: 25"
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

        <TouchableOpacity
          style={[styles.button, isSubmitting && { opacity: 0.7 }]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Salvando..." : "Salvar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  label: { fontSize: 16, marginBottom: 8, color: "#495057", fontWeight: "500" },
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
  error: { color: "red", marginBottom: 10 },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
