import { Item } from "./item"

export class Cart {

   

     items : Item[] = [];
     resume!: {

        quantity: number;
        costHT: number;
        costTax: number;
        costTTC: number;
    }; 
   

    constructor(   
        ){
  
       
      }
}
 