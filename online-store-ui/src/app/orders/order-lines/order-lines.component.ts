import {Component, Input, OnInit} from '@angular/core';
import { OrdersService } from "../orders.service";
import {CartService} from "../../cart/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IOrder} from "../interfaces/order-interface.model";

@Component({
  selector: 'app-order-lines',
  templateUrl: './order-lines.component.html',
  styleUrls: ['./order-lines.component.css']
})
export class OrderLinesComponent implements OnInit {
  pageTitle = "Order items"
  @Input() order: IOrder | undefined
  orderLines: any
  errorMessage = 'Something is wrong'

  constructor(private orderService: OrdersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // @ts-ignore
    this.orderService.getOrderLines(this.order.id).subscribe(data => {
      this.orderLines = data;
    })
  }


}
