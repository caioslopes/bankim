import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "./types";

import DashboardScreen from "../screens/DashboardScreen";
import NovaFonteRecorrenteScreen from "../screens/AdicionarFonteRecorrenteScreen";

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
    </Stack.Navigator>
  );
}
