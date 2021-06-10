import { MbscModule } from '@mobiscroll/angular';
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
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import { OrderLinesComponent } from './orders/order-lines/order-lines.component';
import { NewOrderComponent } from './orders/new-order/new-order.component';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";
import { StorageComponent } from './storage/storage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppRoutingModule} from "./app-routing.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

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
    NewOrderComponent,
    StorageComponent

  ],
  imports: [
    MbscModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MbscModule,
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
      {
        path: 'storage', component: StorageComponent
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
