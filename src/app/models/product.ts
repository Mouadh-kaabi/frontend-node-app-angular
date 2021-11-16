export class Product {
    constructor(public _id : string,
        public name:string,
               public  description : string,
               public price : number,
               public  stock:number,
               public image : string,
                public userId:string,
                public  createdAt :  Date)
    {

    }

}
