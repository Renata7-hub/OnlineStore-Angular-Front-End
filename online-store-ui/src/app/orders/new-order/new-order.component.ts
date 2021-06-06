import { Component, OnInit } from '@angular/core';
import { OrdersService} from "../orders.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Order} from "../interfaces/order.model";

@Component({
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  order: Order;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrdersService) {
    this.order = new class extends Order {};
  }

  onSubmit() {
    console.log(this.orderService.save(this.order).subscribe(result => this.gotoOrdersList()));
  }

  gotoOrdersList() {
    this.router.navigate(['/orders']);
  }

  ngOnInit(): void {
  }
}
