import { Model } from "@nozbe/watermelondb";
import { date, field, readonly, text } from "@nozbe/watermelondb/decorators";
import { TipoMovimentoEnum } from "./enums/TipoMovimentoEnum";
import { EstadoMovimentoEnum } from "./enums/EstadoMovimentoEnum";

export default class FonteRecorrente extends Model {
  static table = "fontes_recorrentes";

  @text("descricao") descricao!: string;
  @text("tipo_movimento") tipoMovimento!: TipoMovimentoEnum;
  @text("estado_movimento") estadoMovimento!: EstadoMovimentoEnum;
  @field("valor") valor!: number;
  @field("dia_vencimento") diaVencimento!: number;
  @date("vigente_ate") vigenteAte?: Date;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}
