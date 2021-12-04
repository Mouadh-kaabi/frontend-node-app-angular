import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(private serviceProduct : ProductService,private auth : AuthService) { }

  products : Product  [] ;
  productSub :  Subscription ; 
  userId  :any ;
  loading : boolean ; 
  ngOnInit(): void {

    this.userId = this.auth.userId ;
    console.log(this.userId);
    

    this.productSub = this.serviceProduct.products$.subscribe(

      (products : Product[])=>{

        this.loading = true ;

        this.products = products ;
      },

      (err)=>{
        this.loading = false ;
        console.log(err);
        
      }
    );
    this.serviceProduct.getProduct();



 

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.productSub.unsubscribe();
  }




}
