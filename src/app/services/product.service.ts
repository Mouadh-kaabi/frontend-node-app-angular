import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Data } from '../models/data';
import {  Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api = environment.api;
 private products : Product [] = [];
   products$ = new Subject<Product[]>();

  constructor(private http : HttpClient) { }


  getProfilesStream() {
    return this.products$.asObservable();
  }
  
  emitProduct()
  {
    this.products$.next(this.products);
  }

  getProduct()
  {

    return this.http
    .get<any>(this.api+'/products').subscribe(
      (data : Data)=>{
        if (data.status == 200 ){
           this.products = data.result; 
           this.emitProduct();

          }else {
            console.log(data);
            
          }
  
        },
        (error)=>{
          console.log(error);
          
        }
      )

 
   







  
  }
  getProductById(id : string)
  {
    return new Promise<any>((resolve,reject)=>{
      this.http.get<any>(this.api+`/products/${id}`).subscribe(
        (data: Data) => {

          if (data.status === 200) {
            resolve(data.result);

          } else {
            reject(data.message);
          }
        },
        err=>{
          reject(err);
        }
      )
    })       
  }

  createNewProduct (product : Product , image : File)
  {

    
    return new Promise((resolve,reject)=>{
      let productData : FormData  = new FormData ();

      productData.append('product',JSON.stringify(product));
      productData.append('image',image);

      this.http.post<any>(this.api+'/products',productData).subscribe(
        (data : Data)=>{

          if(data.status == 201)
          {
            //hethi 5ater akther min user ynjme yzid fard wa9t 
            this.getProduct();
            resolve(data);
          }else {

          reject(data.message);

          }

        },
        (err)=>{
          reject(err);
        }
      )
    
    })
  }

  updatProduct(id : string , product : Product ,image : File | string)
  {
    return new Promise((resolve,reject)=>{
      let productData : FormData = new FormData ();
      
      //image

      if(typeof image == 'string')
      {
        product.image = image ;
      }else {
        productData.append('image',image);
      }

      productData.append('product',JSON.stringify(product));

      this.http.put<any>(this.api+`/products/${id}`,productData).subscribe(

        (data:Data)=>{

          if(data.status == 200)
          {
            resolve(data);
          }else {
            reject(data);
          }

        },
        (err)=>{
          reject(err);
        }
      )
    })
  }

  deleteProduct(id : string)
  {
    return new Promise((resolve,reject)=>
    {
      this.http.delete(this.api+'/products/delete'+id).subscribe(

        ()=>{
          this.getProduct();

          resolve(true);

         

        },
        (err)=>{
          reject(err);
        }
      )
    })
  }
}
