import {IProduct} from "../products/product";

export interface ICart {
  id: number;
  product: IProduct;
  price: number;
}
