
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth : any ; 
  resume : any ;
  
  constructor(private serviceauth : AuthService,private router :Router,private cartService :CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(
      (cart : Cart)=>{
        this.resume = cart.resume;
      },
      (err)=>{
        console.log(err);
        
      }
    )

    this.cartService.emitCart();
    this.serviceauth.isAuth$.subscribe(
      (bool : boolean)=>{
        this.isAuth = bool ;
      }
    )
  }

  logout()  {
    this.serviceauth.logout();

    this.router.navigate(['/signin'])
  }

}
