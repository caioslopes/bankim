import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "./types";

import ResumoAnualScreen from "../screens/ResumoAnualScreen";
import NovoLancamentoScreen from "../screens/NovoLancamentoScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="ResumoAnual">
      <Stack.Screen
        name="ResumoAnual"
        component={ResumoAnualScreen}
        options={{
          title: "Resumo Anual",
        }}
      />
      <Stack.Screen
        name="NovoLancamento"
        component={NovoLancamentoScreen}
        options={{
          title: "Nova despesa",
        }}
      />
    </Stack.Navigator>
  );
}
