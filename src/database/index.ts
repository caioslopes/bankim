import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { mySchema } from "./schema";
import FonteRecorrente from "./model/FonteRecorrente";
import Lancamento from "./model/Lancamento";
import Categoria from "./model/Categoria";
import Cartao from "./model/Cartao";

const adapter = new SQLiteAdapter({
  schema: mySchema,
});

export const database = new Database({
  adapter,
  modelClasses: [Categoria, Cartao, FonteRecorrente, Lancamento],
});

export const collections = {
  lancamentos: database.get<Lancamento>("lancamentos"),
  cartoes: database.get<Cartao>("cartoes"),
  categorias: database.get<Categoria>("categorias"),
  fontesRecorrentes: database.get<FonteRecorrente>("fontes_recorrentes"),
};
