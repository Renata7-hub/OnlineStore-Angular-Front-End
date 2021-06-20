import {Component, OnDestroy, OnInit} from '@angular/core';
import { OrdersService} from "./orders.service";
import {IOrder} from "./interfaces/order-interface.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  pageTitle = "Orders";
  order: IOrder[] = [];
  errorMessage = "Somethings Wrong"
  sub: Subscription | undefined;
  orderTotals: any;

  constructor(private orderService: OrdersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    this.orderService.getOrdersTotalCost().subscribe(data => {
      this.orderTotals = data;
      console.log(this.orderTotals)
    });

  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}
