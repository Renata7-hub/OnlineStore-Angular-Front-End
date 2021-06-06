import { Component, OnInit } from '@angular/core';
import { OrdersService} from "../orders.service";
import {Observable, of} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Order} from "../interfaces/order.model";

@Component({
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  initialsDetails$: any = of ({})
  order: Order;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.order = new class extends Order {};
  }

  ngOnInit(): void {
    //this.ordersService.postOrder()
  }

  // onCreate(order: any){
  //   this.ordersService.postOrder(order)
  // }
}
