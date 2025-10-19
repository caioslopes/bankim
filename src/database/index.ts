import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { mySchema } from "./schema";
import FonteRecorrente from "./model/FonteRecorrente";
import Lancamento from "./model/Lancamento";

const adapter = new SQLiteAdapter({
  schema: mySchema,
});

export const database = new Database({
  adapter,
  modelClasses: [FonteRecorrente, Lancamento],
});

export const collections = {
  lancamentos: database.get<Lancamento>("lancamentos"),
  fontesRecorrentes: database.get<FonteRecorrente>("fontes_recorrentes"),
};
