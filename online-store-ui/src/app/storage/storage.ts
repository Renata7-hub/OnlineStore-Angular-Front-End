import {Injectable, Input} from "@angular/core";

@Injectable()
export class Storage {
  @Input() id!: number;
  @Input() productId!: number;
  @Input() quantity!: number;
  @Input() date!: Date;
}
