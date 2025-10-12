import { Model } from "@nozbe/watermelondb";
import { field, text } from "@nozbe/watermelondb/decorators";

export default class Cartao extends Model {
  static table = "cartoes";

  @text("nome") nome!: string;
  @text("bandeira") bandeira!: string;
  @text("emissor") emissor!: string;
  @field("dia_fechamento") dia_fechamento!: number;
  @field("dia_vencimento") dia_vencimento!: number;
  @field("ativo") ativo!: boolean;
}
