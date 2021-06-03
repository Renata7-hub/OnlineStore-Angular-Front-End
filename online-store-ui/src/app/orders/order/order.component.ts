import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {OrdersService} from "../orders.service";
import {OrderLinesComponent} from "./order-lines/order-lines.component";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  pageTitle = "Order"
  order: any

  constructor(
    private ordersService: OrdersService,
    private  activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const orderId= this.activatedRoute.snapshot.paramMap.get('id');
    // @ts-ignore
    this.ordersService.getOrder(orderId).subscribe(data => {
      this.order = data;
    })
  }

}
