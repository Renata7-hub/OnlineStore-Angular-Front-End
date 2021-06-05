/*export interface Order {
  orderDate: Date;
  userName: string;
  userSurname: string;
  deliveryAddress: string;
}*/

import {Injectable, Input} from "@angular/core";

@Injectable()
export abstract class Order {
  @Input() orderDate!: Date;
  @Input() userName!: string;
  @Input() userSurname!: number;
  @Input() deliveryAddress!: string;
}
