import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {OrdersService} from "../orders.service";
import {OrderLinesComponent} from "../order-lines/order-lines.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Order} from "../interfaces/order.model";



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  pageTitle = "Order"
  @Input() order: any;
  @Input() isNewOrder: boolean | undefined;

  @Output() update = new EventEmitter();

  //newOrder: Order | undefined;

  constructor(
    private ordersService: OrdersService,
    private  activatedRoute: ActivatedRoute,
    private  formBuilder: FormBuilder
  ) { }

/*  orderForm = new FormGroup({
    orderDate: new FormControl(),
    userName: new FormControl(),
    userSurname: new FormControl(),
    deliveryAddress: new FormControl()
  });*/

  orderForm = this.formBuilder.group({
    orderDate: [, [Validators.required]],
    userName: [, [Validators.required]],
    userSurname: [, [Validators.required]],
    deliveryAddress: [, [Validators.required]]
  })


  ngOnInit(): void {
    console.log(this.isNewOrder);
    const orderId= this.activatedRoute.snapshot.paramMap.get('id');
    // @ts-ignore
    this.ordersService.getOrder(orderId).subscribe(data => {
      this.order = data;
    })
  }

  onNext(){
    this.update.emit(this.orderForm.value);
  }
}
