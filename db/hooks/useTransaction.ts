import { useSQLiteContext } from "expo-sqlite";

export enum OPERATION {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
}

export type Transaction = {
  id: number;
  operation: string;
  value: number;
  description: string;
  createdAt: string;
};

export function useTransaction() {
  const db = useSQLiteContext();

  async function create(data: Omit<Transaction, "id" | "createdAt">) {
    const statement = await db.prepareAsync(
      "INSERT INTO transactions (operation, value, description, createdAt) VALUES ($operation, $value, $description, $createdAt);"
    );

    try {
      const result = await statement.executeAsync({
        $operation: data.operation,
        $value: data.value,
        $description: data.description,
        $createdAt: new Date().toISOString(),
      });

      const insertedRowId = result.lastInsertRowId.toLocaleString();
      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      statement.finalizeAsync();
    }
  }

  async function getAll() {
    const statement = await db.prepareAsync("SELECT * FROM transactions");

    try {
      const result = await statement.executeAsync<Transaction>();
      const allRows = await result.getAllAsync();
      return allRows;
    } catch (error) {
      throw error;
    } finally {
      statement.finalizeAsync();
    }
  }

  return { create, getAll };
}
