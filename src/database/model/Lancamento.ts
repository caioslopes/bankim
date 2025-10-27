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
import Cartao from "./Cartao";

export default class Lancamento extends Model {
  static table = "lancamentos";
  static associations = {
    fontes_recorrentes: { type: "belongs_to", key: "fonte_recorrente_id" },
    cartoes: { type: "belongs_to", key: "cartao_id" },
  } as const;

  @text("descricao") descricao!: string;
  @field("valor") valor!: number;
  @date("data_vencimento") dataVencimento!: Date;
  @date("data_pagamento") dataPagamento?: Date;
  @text("tipo_movimento") tipoMovimento!: TipoMovimentoEnum;
  @text("estado_movimento") estadoMovimento!: EstadoMovimentoEnum;
  @field("competencia") competencia!: string; // "YYYY-MM"

  @field("fonte_recorrente_id") fonteRecorrenteId?: string;
  @field("cartao_id") cartaoId?: string;

  @relation("fontes_recorrentes", "fonte_recorrente_id")
  fonteRecorrente?: FonteRecorrente;

  @relation("cartoes", "cartao_id")
  cartao?: Cartao;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}
