import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginData } from '../Models/user';
import { AuthserviceService } from '../services/authservice.service';
import { HttpClientService } from '../services/http-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email!:string;
  password!:string;
  message='';
  success!:boolean;
  constructor(private router:Router,private httpService:HttpClientService,private authService:AuthserviceService) { }

  ngOnInit(): void {
  }

  routerLink(){
    //  alert("hello");
     this.router.navigate(['/signup']);
  }
  login(){
      const rawData={
        email:this.email,
        password:this.password
      }
      this.httpService.userLogin(rawData).subscribe((data:loginData)=>{
            console.log(data);
            this.success=data['success'];
            this.message=data['message'];
            this.authService.isLoggedIn(this.success);
            this.authService.accessToken=data['token'];
            console.log(data['id']);
            this.authService.id=data['id'];
            this.router.navigate(['/dashboard']);
      })
  }
}
