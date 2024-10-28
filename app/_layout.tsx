import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

import { initializeDatabase } from "@/db/initializeDatabase";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="teste1.db" onInit={initializeDatabase}>
      <Slot />
    </SQLiteProvider>
  );
}
