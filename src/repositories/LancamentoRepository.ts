import { Q } from "@nozbe/watermelondb";
import { database, collections } from "../database";
import { TipoMovimentoEnum } from "../database/model/enums/TipoMovimentoEnum";
import { EstadoMovimentoEnum } from "../database/model/enums/EstadoMovimentoEnum";

export type CreateLancamento = {
  descricao: string;
  tipoMovimento: TipoMovimentoEnum;
  estadoMovimento: EstadoMovimentoEnum;
  valor: number;
  dataVencimento: Date;
  competencia: string;
  cartaoId?: string;
  fonteRecorrenteId?: string;
};

export type UpdateLancamento = Partial<CreateLancamento>;

class LancamentoRepository {
  private lancamentoCollection = collections.lancamentos;

  observeActiveLancamentos() {
    return this.lancamentoCollection.query().observe();
  }

  async getAll() {
    return await this.lancamentoCollection.query().fetch();
  }

  async getAllByCartaoIdAndCompetencia(cartaoId: string, competencia: string) {
    return await this.lancamentoCollection
      .query(
        Q.where("cartao_id", cartaoId),
        Q.where("competencia", competencia)
      )
      .fetch();
  }

  async create(data: CreateLancamento) {
    return await database.write(async () => {
      return await this.lancamentoCollection.create((lancamento) => {
        lancamento.descricao = data.descricao;
        lancamento.tipoMovimento = data.tipoMovimento;
        lancamento.valor = data.valor;
        lancamento.dataVencimento = data.dataVencimento;
        lancamento.competencia = data.competencia;

        if (data.cartaoId) {
          lancamento.cartaoId = data.cartaoId;
        }

        if (data.fonteRecorrenteId) {
          lancamento.fonteRecorrenteId = data.fonteRecorrenteId;
        }
      });
    });
  }

  async update(id: string, data: Partial<UpdateLancamento>) {
    const record = await this.lancamentoCollection.find(id);
    if (!record) return null;

    return await database.write(async () => {
      await record.update((fonte) => {
        Object.assign(fonte, data);
      });
    });
  }

  async togglePaid(id: string) {
    const record = await this.lancamentoCollection.find(id);
    if (!record) return null;

    const pagoEm = record.dataPagamento;

    return await database.write(async () => {
      await record.update((fonte) => {
        fonte.dataPagamento = pagoEm === undefined ? new Date() : undefined;
      });
    });
  }
}

export const lancamentoRepository = new LancamentoRepository();
