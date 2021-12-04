import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.api ;
  token : any  ;
  userId : any ;

  //observable
  isAuth$ = new BehaviorSubject<boolean> (false);
  constructor(private http : HttpClient) {
    this.initAuth();
   }

  
  signup(email:string,password : string)
  {
    //return promise parceque avec le promis on sait quand va attendre
    //elle retourne un oobservable il faut l'abonement 
    return  new Promise((resolve,reject)=>{
      this.http.post<any>(this.api+'/users/signup',{email:email,password : password}).subscribe(
        (signupData: {status : number,message : string})=>{


          console.log(signupData);
          
          if(signupData.status == 201)
          {
             //authentifier l'utlisateur 
             this.signin(email,password).then(()=>{
               resolve(true);
             }).catch((err)=>{
               reject(err)
             });

          }else{
            reject(signupData.message);
          }

         

        },
        (error)=>{
          reject(error)
        }
      )
    })

  }
  signin(email:string,password : string)
  {
    return new Promise((resolve,reject)=>{

      this.http.post<any>(this.api+'/users/login',{email :email , password : password}).subscribe(
        (authData:{token : string , userId : string})=>{

          this.token = authData.token ;
          this.userId = authData.userId ;
          this.isAuth$.next(true);

          //save authData in local
          if(typeof localStorage !== "undefined")
          {
            //transformation de l'objet authdata en string 
            localStorage.setItem('auth',JSON.stringify(authData));
          }


          resolve(true);
        },
        (error)=>{
          reject(error)
        }
      )
    })
    
  }

  //verification de l'infomation sur navigateur 

  initAuth()
  {
    if(typeof localStorage !== "undefined")
    {
      const data = JSON.parse( localStorage.getItem('auth')!)
      if(data)
      {
        if(data.userId && data.token)
        {
          this.userId = data.userId;
          this.token = data.token ; 
          this.isAuth$.next(true);
        }
      }
    }
  }

  logout()
  {

    this.isAuth$.next(false);
    this.userId = null ;
    this.token = null ; 

    localStorage.removeItem('auth') ;

    
   
  }
}

