import { Model } from "@nozbe/watermelondb";
import { date, field, readonly, text } from "@nozbe/watermelondb/decorators";
import { TipoOperacaoEnum } from "./TipoOperacaoEnum";

export default class FonteRecorrente extends Model {
  static table = "fontes_recorrentes";

  @text("descricao") descricao!: string;
  @text("tipo") tipo!: TipoOperacaoEnum; // ENTRADA | SAIDA
  @field("valor") valor!: number;
  @field("data_vencimento") dataVencimento!: number;
  @date("vigente_ate") vigenteAte?: Date;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}
