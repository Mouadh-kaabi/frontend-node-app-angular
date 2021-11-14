import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth : any ; 
  constructor(private serviceauth : AuthService) { }

  ngOnInit(): void {

    this.serviceauth.isAuth$.subscribe(
      (bool : boolean)=>{
        this.isAuth = bool ;
      }
    )
  }

  logout()  {
    this.serviceauth.logout();
  }

}
