import { database, collections } from "../database";
import { EstadoMovimentoEnum } from "../database/model/enums/EstadoMovimentoEnum";
import { TipoMovimentoEnum } from "../database/model/enums/TipoMovimentoEnum";

export type CreateFonteRecorrente = {
  descricao: string;
  tipoMovimento: TipoMovimentoEnum;
  estadoMovimento: EstadoMovimentoEnum;
  valor: number;
  diaVencimento: number;
  vigenteAte?: Date;
};

export type UpdateFonteRecorrente = Partial<CreateFonteRecorrente>;

class FonteRecorrenteRepository {
  private fonteRecorrenteCollection = collections.fontesRecorrentes;

  observeActiveFonteRecorrente() {
    return this.fonteRecorrenteCollection.query().observe();
  }

  async getAll() {
    return await this.fonteRecorrenteCollection.query().fetch();
  }

  async create(data: CreateFonteRecorrente) {
    return await database.write(async () => {
      return await this.fonteRecorrenteCollection.create((fonte) => {
        Object.assign(fonte, data);
      });
    });
  }

  async update(id: string, data: UpdateFonteRecorrente) {
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
