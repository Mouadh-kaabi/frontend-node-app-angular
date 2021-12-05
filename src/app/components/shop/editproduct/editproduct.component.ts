import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {


  
  productForm : FormGroup ;

  errorMessage : string ; 

  imagePreview : string ;

  loading : boolean ; 

  product : Product ;
  userId : string ;
  constructor(private produitService : ProductService,private formBuilder : FormBuilder,private route : ActivatedRoute,private router : Router,private auth : AuthService) { }

  ngOnInit(): void {

    this.userId = this.auth.userId
    this.loading = true ;

    this.route.params.subscribe(
     
      (params : Params)=>{
        this.produitService.getProductById(params['id']).
        then(
          (product : Product)=>{

            this.product = product ;
            if(this.product.userId !== this.userId)
            {
              console.log("You can't edit this product ");
              
             //return  this.router.navigate(['/not-found'])
            }
            this.productForm = this.formBuilder.group({
              name : [product.name,Validators.required],
              description : [product.description,Validators.required],
              stock : [product.stock,Validators.required],
              price : [product.price,Validators.required],
              image : [product.image,Validators.required],
          });

          this.imagePreview = product.image;

          this.loading = false ; 
          
        })
        .catch(
          (err)=>{
            console.log(err.message);

            return this.router.navigate(['/shop']);
            
          }
        )
      })

  }


  onSubmit()
  {

    this.loading = true ;
    const product = new Product();

    if(this.product.userId !== this.userId)
            {
              console.log("You can't edit this product ");
              
             //return  this.router.navigate(['/not-found'])
            }
    product._id = this.product._id ;

    product.name = this.productForm.get('name')?.value;
   
    product.description = this.productForm.get('description')?.value;
    product.price = this.productForm.get('price')?.value;
    product.stock = this.productForm.get('stock')?.value;
    product.image = '';
    product.userId =  this.product.userId ;  


    //save edit 
    this.produitService.updatProduct(product._id,product,this.productForm.get('image')?.value)
    .then(
      ()=>{

        this.productForm.reset();
        this.loading = false ;
        this.router.navigate(['/shop'])

      }
     
    ).catch(
      (err)=>{
        this.loading= false ;
        this.errorMessage = err.message ;
      }
    )


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


}
