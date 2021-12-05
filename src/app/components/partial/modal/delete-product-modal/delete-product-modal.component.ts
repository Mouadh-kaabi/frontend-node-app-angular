import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.css']
})
export class DeleteProductModalComponent implements OnInit {

  @Input() product : Product ;
  userId : string ; 
  constructor(private auth : AuthService,private productservice : ProductService,private router : Router) { }

  ngOnInit(): void {
    this.userId = this.auth.userId
  }
  deleteProdct(prodct : Product)
  {
    console.log("Product deleted !");
    if(this.userId !==this.product.userId )
    {
      // this.router
    }
    this.productservice.deleteProduct(this.product._id).then(
      ()=>{
        console.log("Product deleted ");
        
      }
    ).catch(

      ()=>{
        return this.router.navigate(['/shop']);
      }

    )
    

  }

}
