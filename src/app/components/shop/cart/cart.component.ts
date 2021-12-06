import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Item } from 'src/app/models/item';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart : Cart ; 
  items : Item [] = [];
  resume : {quantity: number,
    costHT: number,
    costTax: number, 
    costTTC: number, }
  constructor(private cartservice : CartService) { }

  ngOnInit(): void {

    this.cartservice.cart$.subscribe(
      (cart:Cart)=>{
        this.cart = cart;
        this.items = cart.items;
      }
    )
   this.cartservice.emitCart();
  }

  addToCart(product : Product)
  {
    this.cartservice.addToCart(product);
  }

  removeOne(product :Product)
  {
    this.cartservice.removeOne(product);
  }


  removeMany(product : Product)
  {
    this.cartservice.removemany(product);
    
  }

}
