import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { NotFoundComponent } from './components/partial/not-found/not-found.component';
import { AddproductComponent } from './components/shop/addproduct/addproduct.component';
import { CartComponent } from './components/shop/cart/cart.component';
import { EditproductComponent } from './components/shop/editproduct/editproduct.component';
import { ShopComponent } from './components/shop/shop.component';
import { SingleproductComponent } from './components/shop/singleproduct/singleproduct.component';

const routes: Routes = [

  {path:'signup',component:SignupComponent},
  {path:'signin',component:SigninComponent},
  {path:'shop',component:ShopComponent},
  {path:'add-product',component:AddproductComponent},
  {path:'single-product/:id',component:SingleproductComponent},
  {path:'edit-product/:id',component:EditproductComponent},
  {path:'cart',component:CartComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
