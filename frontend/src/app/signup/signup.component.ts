import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import { HttpClientService } from '../services/http-client.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userName:string='';
  email:string='';
  password:string='';
  file!:File;
  message='';
  success!:boolean;
  constructor(private httpService:HttpClientService,private router:Router) { }

  ngOnInit(): void {
    //  console.log(this.userName);
    //  console.log(this.email);
    //  console.log(this.password);
  }
  childData(val:File){
    this.file=val;
  }
  onSubmit(){
    const formData=new FormData();
    formData.append("email",this.email);
    formData.append("username",this.userName);
    formData.append("resume",this.file);
    formData.append("password",this.password);
    this.httpService.userSignup(formData).subscribe((userData:any)=>{
            console.log(userData);
            // if(userData.success){
            //   alert();
            //   this.successMessage=userData.error['message'];
            // }

              this.success=userData['success'];
              console.log(this.success);
              this.message=userData['message'];

    })
  }
  routeLink(){
     this.router.navigate(['/login']);
  }
}
