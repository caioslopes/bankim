import { collections, database } from "../database";
import { EmissorCartaoEnum } from "../database/model/enums/EmissorCartaoEnum";

export type CreateCartao = {
  nome: string;
  emissor: EmissorCartaoEnum;
  diaFechamento: number;
  diaVencimento: number;
};

export type UpdateCartao = Partial<CreateCartao & { ativo: boolean }>;

class CartaoRepository {
  private cartoesCollection = collections.cartoes;

  observeActiveCartao() {
    return this.cartoesCollection.query().observe();
  }

  async getAll() {
    return await this.cartoesCollection.query().fetch();
  }

  async create(data: CreateCartao) {
    return await database.write(async () => {
      return await this.cartoesCollection.create((cartao) => {
        Object.assign(cartao, data);
      });
    });
  }

  async update(id: string, data: UpdateCartao) {
    const record = await this.cartoesCollection.find(id);
    if (!record) return null;

    return await database.write(async () => {
      await record.update((cartao) => {
        Object.assign(cartao, data);
      });
    });
  }

  async toggleAtivo(id: string) {
    const record = await this.cartoesCollection.find(id);
    if (!record) return null;

    const isAtivo = record.ativo;

    return await database.write(async () => {
      await record.update((cartao) => {
        cartao.ativo = isAtivo ? false : true;
      });
    });
  }
}

export const cartaoRepository = new CartaoRepository();
