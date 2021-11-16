import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ShopComponent } from './components/shop/shop.component';
import { SingleproductComponent } from './components/shop/singleproduct/singleproduct.component';
import { AddproductComponent } from './components/shop/addproduct/addproduct.component';
import { EditproductComponent } from './components/shop/editproduct/editproduct.component';
import { CartComponent } from './components/shop/cart/cart.component';
import { HeaderComponent } from './components/partial/header/header.component';
import { FooterComponent } from './components/partial/footer/footer.component';
import { NotFoundComponent } from './components/partial/not-found/not-found.component';
import { HeaderPageComponent } from './components/partial/header-page/header-page.component';
import { QuickViewModalComponent } from './components/partial/modal/quick-view-modal/quick-view-modal.component';
import { AddToCartModalComponent } from './components/partial/modal/add-to-cart-modal/add-to-cart-modal.component';
import { DeleteProductModalComponent } from './components/partial/modal/delete-product-modal/delete-product-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    ShopComponent,
    SingleproductComponent,
    AddproductComponent,
    EditproductComponent,
    CartComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    HeaderPageComponent,
    QuickViewModalComponent,
    AddToCartModalComponent,
    DeleteProductModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor , multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
