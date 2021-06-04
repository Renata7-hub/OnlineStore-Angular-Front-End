import {Component, Input, OnInit} from '@angular/core';
import { OrdersService } from "../orders.service";
import {CartService} from "../../cart/cart.service";

@Component({
  selector: 'app-order-lines',
  templateUrl: './order-lines.component.html',
  styleUrls: ['./order-lines.component.css']
})
export class OrderLinesComponent implements OnInit {
  pageTitle = "Order items"
  @Input() order: any
  orderLines: any

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.orderService.getOrderLines(this.order.id).subscribe(data => {
      this.orderLines = data;
    })
  }

}
