import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from "./products/product-list.component";
import { FormsModule } from "@angular/forms";
import { ProductDetailComponent } from './products/product-detail.component';
import { RouterModule } from "@angular/router";
import { ProductDetailGuard } from "./products/product-detail.guard";
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { WelcomeComponent } from "./home/welcome.component";
import { LoginComponent } from "./login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { OrderLinesComponent } from './orders/order-lines/order-lines.component';
import { NewOrderComponent } from './orders/new-order/new-order.component';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    LoginComponent,
    WelcomeComponent,
    CartComponent,
    OrdersComponent,
    OrderComponent,
    OrderLinesComponent,
    ProductFormComponent,
    NewOrderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'welcome', component: WelcomeComponent },
      {path: 'add-product', component: ProductFormComponent},
      {path: 'products', component: ProductListComponent},
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
      },
      {
        path: 'cart', component: CartComponent
      },
      {
        path: 'orders', component: OrdersComponent
      },
      {
        path: 'order/:id',
        component: OrderComponent
      },
      {
        path: 'orders/new', component: NewOrderComponent
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
