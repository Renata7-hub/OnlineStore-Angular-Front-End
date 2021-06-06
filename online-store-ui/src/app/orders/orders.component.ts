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

  constructor(private orderService: OrdersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: orders => {
        this.order = orders;
      },
      error: err => this.errorMessage = err
    });

  }

  // getOrder(id: number): void {
  //   this.orderService.getOrder(id).subscribe({
  //     next: order => this.order = order,
  //     error: err => this.errorMessage = err
  //   });
  // }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}
