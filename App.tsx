import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NovoLancamentoScreen from "./src/screens/NovoLancamentoScreen";
import ResumoAnualScreen from "./src/screens/ResumoAnualScreen";

const Stack = createNativeStackNavigator();

function TelaDashboard({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard Financeiro</Text>
      <Text>Aqui ficará a lista de meses.</Text>
      <TouchableOpacity onPress={() => navigation.navigate("NovoLancamento")}>
        <Text>Novo lançamento</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("ResumoAnual")}>
        <Text>Resumo anual tela</Text>
      </TouchableOpacity>
    </View>
  );
}

function TelaDetalhesMes() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Mês</Text>
      <Text>Aqui ficarão os detalhes, gráficos e lançamentos.</Text>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard">
          <Stack.Screen
            name="Dashboard"
            component={TelaDashboard}
            options={{ title: "Resumo Anual" }}
          />
          <Stack.Screen
            name="DetalhesMes"
            component={TelaDetalhesMes}
            options={{ title: "Detalhes do Mês" }}
          />
          <Stack.Screen
            name="NovoLancamento"
            component={NovoLancamentoScreen}
            options={{ title: "Novo lancamento" }}
          />
          <Stack.Screen
            name="ResumoAnual"
            component={ResumoAnualScreen}
            options={{ title: "Resumo Anual Detalhes" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
