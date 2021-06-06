import {Injectable, Input} from "@angular/core";

@Injectable()
export abstract class Order {
  @Input() id!: number;
  @Input() orderDate!: Date;
  @Input() userName!: string;
  @Input() userSurname!: number;
  @Input() deliveryAddress!: string;
}
