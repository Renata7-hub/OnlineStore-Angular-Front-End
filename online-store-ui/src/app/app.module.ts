import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ProductListComponent} from "./products/product-list.component";
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ProductDetailComponent } from './products/product-detail.component';
import {RouterModule} from "@angular/router";
import {WelcomeComponent} from "./home/welcome.component";
import {ProductDetailGuard} from "./products/product-detail.guard";
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    WelcomeComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'products', component: ProductListComponent},
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
      },
      {
        path: 'cart', component: CartComponent
      },
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
