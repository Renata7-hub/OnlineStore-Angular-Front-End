import {Injectable, Input} from "@angular/core";
import {IProduct} from "../products/product";

@Injectable()
export class Storage {
  @Input() productId!: number;
  @Input() quantity!: number;
  @Input() date!: Date;
}
