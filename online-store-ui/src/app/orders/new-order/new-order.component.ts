import { Component, OnInit } from '@angular/core';
import { OrdersService} from "../orders.service";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  initialsDetails$: any = of ({})
  order: any;

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    //this.ordersService.postOrder()
  }

  onCreate(order: any){
    this.ordersService.postOrder(order)
  }
}
