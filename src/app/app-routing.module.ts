import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/partial/not-found/not-found.component';
import { AddproductComponent } from './components/shop/addproduct/addproduct.component';
import { CartComponent } from './components/shop/cart/cart.component';
import { EditproductComponent } from './components/shop/editproduct/editproduct.component';
import { ShopComponent } from './components/shop/shop.component';
import { SingleproductComponent } from './components/shop/singleproduct/singleproduct.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:'signup',component:SignupComponent},
  {path:'signin',component:SigninComponent},
  {path:'shop',component:ShopComponent},
  {path:'add-product',component:AddproductComponent , canActivate : [AuthGuard]},
  {path:'single-product/:id',component:SingleproductComponent},
  {path:'edit-product/:id',component:EditproductComponent,canActivate : [AuthGuard]},
  {path:'cart',component:CartComponent},
  {path:'home',component:HomeComponent},
  {path:'not-found',component:NotFoundComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
