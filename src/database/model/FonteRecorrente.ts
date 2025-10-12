import { Model } from "@nozbe/watermelondb";
import { field, relation, text } from "@nozbe/watermelondb/decorators";
import Categoria from "./Categoria";

export default class FonteRecorrente extends Model {
  static table = "fontes_recorrentes";

  @text("descricao") descricao!: string;
  @text("tipo") tipo!: string;
  @field("valor_padrao") valor_padrao!: number;
  @field("dia_do_mes") dia_do_mes!: number;

  @relation("categorias", "categoria_id") categoria!: Categoria;
}
