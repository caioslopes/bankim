import { Model } from "@nozbe/watermelondb";
import {
  date,
  field,
  readonly,
  relation,
  text,
} from "@nozbe/watermelondb/decorators";
import FonteRecorrente from "./FonteRecorrente";
import { TipoOperacaoEnum } from "./TipoOperacaoEnum";

export default class Lancamento extends Model {
  static table = "lancamentos";

  @text("descricao") descricao!: string;
  @field("valor") valor!: number;
  @date("data_vencimento") dataVencimento!: Date;
  @date("data_pagamento") dataPagamento?: Date;
  @text("tipo") tipo!: TipoOperacaoEnum; // ENTRADA | SAIDA
  @field("competencia") competencia!: string;

  @relation("fontes_recorrentes", "fonte_recorrente_id")
  fonteRecorrente?: FonteRecorrente;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}
