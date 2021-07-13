import {IProduct} from "../products/product";

export interface IStorage {
  product: IProduct;
  quantity: number;
  date: Date;
}
