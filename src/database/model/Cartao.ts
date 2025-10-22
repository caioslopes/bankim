import { Model } from "@nozbe/watermelondb";
import { date, field, readonly, text } from "@nozbe/watermelondb/decorators";
import { EmissorCartaoEnum } from "./enums/EmissorCartaoEnum";

export default class Cartao extends Model {
  static table = "cartoes";

  @text("nome") nome!: string;
  @text("emissor") emissor!: EmissorCartaoEnum;
  @field("dia_fechamento") diaFechamento!: number;
  @field("dia_vencimento") diaVencimento!: number;
  @field("ativo") ativo!: boolean;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}
