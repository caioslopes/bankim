import { database, collections } from "../database";
import { TipoMovimentoEnum } from "../database/model/enums/TipoMovimentoEnum";

export type CreateLancamento = {
  descricao: string;
  tipoMovimento: TipoMovimentoEnum;
  valor: number;
  dataVencimento: Date;
  competencia: string;
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

  async create(data: CreateLancamento) {
    return await database.write(async () => {
      return await this.lancamentoCollection.create((fonte) => {
        Object.assign(fonte, data);
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
