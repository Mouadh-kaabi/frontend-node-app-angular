import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm : FormGroup ;
  errorMessage : string ;
  loading : boolean ;
  constructor(private formBuilder : FormBuilder,private serviceauth : AuthService,private router : Router) { }

  ngOnInit(): void {

    this.signinForm = this.formBuilder.group({
      email:[null,[Validators.required,Validators.email]],
      password : [null,Validators.required]
    });
  }

  onSubmit()
  {
    this.loading = true;
    const email = this.signinForm.get('email')?.value ;
    const password = this.signinForm.get('password')?.value ;

    this.serviceauth.signin(email,password).then(
      ()=>{
        this.loading = false;
        this.router.navigate(['/shop']);
      }).catch(
        (error)=>{
          this.loading = false;
          this.errorMessage = error.message ; 
        }
      )
  }

}
