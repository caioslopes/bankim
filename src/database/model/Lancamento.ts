import { Model } from "@nozbe/watermelondb";
import { date, field, relation, text } from "@nozbe/watermelondb/decorators";
import Categoria from "./Categoria";
import Cartao from "./Cartao";
import FonteRecorrente from "./FonteRecorrente";

export default class Lancamento extends Model {
  static table = "lancamentos";

  @text("descricao") descricao!: string;
  @field("valor") valor!: number;

  @date("data_vencimento") data_vencimento!: Date;
  @field("pago") pago!: boolean;
  @date("data_pagamento") data_pagamento!: Date;
  @text("tipo") tipo!: string;
  @text("grupo_parcela_id") grupo_parcela_id!: string;
  @field("parcela_atual") parcela_atual!: number;
  @field("total_parcelas") total_parcelas!: number;

  @relation("categorias", "categoria_id") categoria!: Categoria;
  @relation("cartoes", "cartao_id") cartao!: Cartao;
  @relation("fontes_recorrentes", "fonte_recorrente_id")
  fonteRecorrente!: FonteRecorrente;
}
