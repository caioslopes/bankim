import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const mySchema = appSchema({
  version: 7,
  tables: [
    tableSchema({
      name: "cartoes",
      columns: [
        { name: "nome", type: "string" },
        { name: "emissor", type: "string" },
        { name: "dia_fechamento", type: "number" },
        { name: "dia_vencimento", type: "number" },
        { name: "ativo", type: "boolean" },

        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),

    tableSchema({
      name: "fontes_recorrentes",
      columns: [
        { name: "descricao", type: "string" },
        { name: "tipo_movimento", type: "string" },
        { name: "estado_movimento", type: "string" },
        { name: "valor", type: "number" },
        { name: "dia_vencimento", type: "number" },
        { name: "vigente_ate", type: "number", isOptional: true },

        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),

    tableSchema({
      name: "lancamentos",
      columns: [
        { name: "descricao", type: "string" },
        { name: "valor", type: "number" },
        { name: "data_vencimento", type: "number" },
        { name: "data_pagamento", type: "number", isOptional: true },
        { name: "tipo_movimento", type: "string" },
        { name: "estado_movimento", type: "string" },
        { name: "competencia", type: "string" },
        { name: "fonte_recorrente_id", type: "string", isOptional: true },
        { name: "cartao_id", type: "string", isOptional: true },

        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});
