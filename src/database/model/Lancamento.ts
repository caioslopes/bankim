import { Model } from "@nozbe/watermelondb";
import {
  date,
  field,
  readonly,
  relation,
  text,
} from "@nozbe/watermelondb/decorators";
import FonteRecorrente from "./FonteRecorrente";
import { TipoMovimentoEnum } from "./enums/TipoMovimentoEnum";
import { EstadoMovimentoEnum } from "./enums/EstadoMovimentoEnum";

export default class Lancamento extends Model {
  static table = "lancamentos";

  @text("descricao") descricao!: string;
  @field("valor") valor!: number;
  @date("data_vencimento") dataVencimento!: Date;
  @date("data_pagamento") dataPagamento?: Date;
  @text("tipo_movimento") tipoMovimento!: TipoMovimentoEnum;
  @text("estado_movimento") estadoMovimento!: EstadoMovimentoEnum;
  @field("competencia") competencia!: string; // "YYYY-MM"

  @relation("fontes_recorrentes", "fonte_recorrente_id")
  fonteRecorrente?: FonteRecorrente;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}
