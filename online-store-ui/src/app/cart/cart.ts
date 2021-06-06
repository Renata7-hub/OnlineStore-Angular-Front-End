import {Injectable, Input} from "@angular/core";
import {IProduct} from "../products/product";

@Injectable()
export class Cart {

  @Input() product!: IProduct;
  @Input() quantity!: number;

}

