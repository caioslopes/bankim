import { database, collections } from "../database";

class LancamentoRepository {
  private lancamentoCollection = collections.lancamentos;

  observeActiveLancamentos() {
    return this.lancamentoCollection.query().observe();
  }

  async getAll() {
    return await this.lancamentoCollection.query().fetch();
  }

  async create(data: { descricao: string; valor: number }) {
    return await database.write(async () => {
      return await this.lancamentoCollection.create((fonte) => {
        Object.assign(fonte, data);
      });
    });
  }

  async update(
    id: string,
    data: Partial<{ descricao: string; valor: number }>
  ) {
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
