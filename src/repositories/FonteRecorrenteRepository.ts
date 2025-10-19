import { database, collections } from "../database";

class FonteRecorrenteRepository {
  private fonteRecorrenteCollection = collections.fontesRecorrentes;

  observeActiveFonteRecorrente() {
    return this.fonteRecorrenteCollection.query().observe();
  }

  async getAll() {
    return await this.fonteRecorrenteCollection.query().fetch();
  }

  async create(data: { descricao: string; valor: number }) {
    return await database.write(async () => {
      return await this.fonteRecorrenteCollection.create((fonte) => {
        Object.assign(fonte, data);
      });
    });
  }

  async update(
    id: string,
    data: Partial<{ descricao: string; valor: number }>
  ) {
    const record = await this.fonteRecorrenteCollection.find(id);
    if (!record) return null;

    return await database.write(async () => {
      await record.update((fonte) => {
        Object.assign(fonte, data);
      });
    });
  }

  async delete(id: string) {
    const record = await this.fonteRecorrenteCollection.find(id);
    if (!record) return null;

    return await database.write(async () => {
      await record.update((fonte) => {
        fonte.vigenteAte = new Date();
      });
    });
  }
}

export const fonteRecorrenteRepository = new FonteRecorrenteRepository();
