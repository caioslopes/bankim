import { Model } from "@nozbe/watermelondb";
import { text } from "@nozbe/watermelondb/decorators";

export default class Categoria extends Model {
  static table = "categorias";

  @text("nome") nome!: string;
  @text("cor") cor!: string;
}
