import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "./types";

import DashboardScreen from "../screens/DashboardScreen";
import NovaFonteRecorrenteScreen from "../screens/NovaFonteRecorrenteScreen";
import NovoLancamentoScreen from "../screens/NovoLancamentoScreen";
import NovoCartaoScreen from "../screens/NovoCartaoScreen";
import DetalhesMesScreen from "../screens/DetalhesMesScreen";
import DetalhesCartaoScreen from "../screens/DetalhesCartaoScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="DashboardScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
      <Stack.Screen
        name="NovaFonteRecorrenteScreen"
        component={NovaFonteRecorrenteScreen}
      />

      <Stack.Screen
        name="NovoLancamentoScreen"
        component={NovoLancamentoScreen}
      />
      <Stack.Screen name="NovoCartaoScreen" component={NovoCartaoScreen} />
      <Stack.Screen name="DetalhesMesScreen" component={DetalhesMesScreen} />
      <Stack.Screen
        name="DetalhesCartaoScreen"
        component={DetalhesCartaoScreen}
      />
    </Stack.Navigator>
  );
}
