import {Injectable, Input} from "@angular/core";

@Injectable()
export abstract class Products {
  @Input() title!: string;
  @Input() description!: string;
  @Input() price!: number;
  @Input() type!: string;
}
