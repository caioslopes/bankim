import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { mySchema } from "./schema";
import FonteRecorrente from "./model/FonteRecorrente";
import Lancamento from "./model/Lancamento";
import Cartao from "./model/Cartao";

const adapter = new SQLiteAdapter({
  schema: mySchema,
});

export const database = new Database({
  adapter,
  modelClasses: [Cartao, FonteRecorrente, Lancamento],
});

export const collections = {
  cartoes: database.get<Cartao>("cartoes"),
  lancamentos: database.get<Lancamento>("lancamentos"),
  fontesRecorrentes: database.get<FonteRecorrente>("fontes_recorrentes"),
};
