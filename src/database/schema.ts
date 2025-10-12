import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "categorias",
      columns: [
        { name: "nome", type: "string" },
        { name: "cor", type: "string", isOptional: true },
      ],
    }),

    tableSchema({
      name: "cartoes",
      columns: [
        { name: "nome", type: "string" },
        { name: "bandeira", type: "string" },
        { name: "emissor", type: "string" },
        { name: "dia_fechamento", type: "number" },
        { name: "dia_vencimento", type: "number" },
        { name: "ativo", type: "boolean" },
      ],
    }),

    tableSchema({
      name: "fontes_recorrentes",
      columns: [
        { name: "descricao", type: "string" },
        { name: "tipo", type: "string" },
        { name: "valor_padrao", type: "number" },
        { name: "dia_do_mes", type: "number" },
        { name: "categoria_id", type: "string", isOptional: true },
      ],
    }),

    tableSchema({
      name: "lancamentos",
      columns: [
        { name: "descricao", type: "string" },
        { name: "valor", type: "number" },
        { name: "data_vencimento", type: "number" },
        { name: "pago", type: "boolean" },
        { name: "data_pagamento", type: "number", isOptional: true },
        { name: "tipo", type: "string" },
        { name: "grupo_parcela_id", type: "string", isOptional: true },
        { name: "parcela_atual", type: "number", isOptional: true },
        { name: "total_parcelas", type: "number", isOptional: true },

        { name: "categoria_id", type: "string", isOptional: true },
        { name: "cartao_id", type: "string", isOptional: true },
        { name: "fonte_recorrente_id", type: "string", isOptional: true },
      ],
    }),
  ],
});
