
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  productForm : FormGroup ;

  errorMessage : string ; 

  imagePreview : string ;

  loading : boolean ; 

  userId : string ;

  product = new Product();

  constructor(private formBuilder : FormBuilder,private serviceProduct :ProductService,
    private auth : AuthService,private router : Router) { }


  ngOnInit(): void {

    this.productForm = this.formBuilder.group({
      name : [null,Validators.required],
      description : [null,Validators.required],
      stock : [2,Validators.required],
      price : [0,Validators.required],
      image : [null,Validators.required],

    });

    this.userId= this.auth.userId;

    
  }

  onImagePick(event : Event){

    const file = (event.target as HTMLInputElement)?.files?.[0];;
    this.productForm.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit()
  {

    this.loading = true ; 
    const product = new Product();
    product.name = this.productForm.get('name')?.value;
   
    product.description = this.productForm.get('description')?.value;
    product.price = this.productForm.get('price')?.value;
    product.stock = this.productForm.get('stock')?.value;
    product.image = '';
    product.userId = this.userId ; 
    console.log(this.product);
    

    this.serviceProduct.createNewProduct(this.product, this.productForm.get('image')?.value)
    .then(
      ()=>{
        this.productForm.reset();
        this.loading = false ;
        this.router.navigate(['/shop']);
      }
    ).catch(

     
      (err)=>{

        this.loading = true ;
        this.errorMessage = err.message ;
      }
    );
    this.productForm.reset();
    this.imagePreview = '';

   
  }


}
