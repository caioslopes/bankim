import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function TelaDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard Financeiro</Text>
      <Text>Aqui ficará a lista de meses.</Text>
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
