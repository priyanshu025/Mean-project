import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { userData } from '../Models/user';
import { AuthserviceService } from '../services/authservice.service';
import { HttpClientService } from '../services/http-client.service';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
  // providers:[]
})
export class DashBoardComponent implements OnInit {

  // @HostListener('window:popstate', ['$event'])
  // onPopState(event:any) {
  //   console.log('Back button pressed');
  //   //this.router.navigate(['/login']);
  // }
  @ViewChild("iframe") iframe!: ElementRef;
  resumeUrl='';
  errormsg:boolean=true;
  //id=6422abca55a3d72f39b3e964;
  constructor(private auth:AuthserviceService,private http:HttpClientService,private router:Router) { }

  ngOnInit(): void {
    //console.log(this.auth);
    console.log(this.auth.id,this.auth.accessToken);
    this.http.getUser(this.auth.id).subscribe((data:userData)=>{
          //console.log(data);
          // if()
          this.errormsg=false;
          this.resumeUrl=data['resumeLink'];
          this.iframe.nativeElement.contentWindow.location.replace(this.resumeUrl);
          console.log(this.resumeUrl);
    },(err)=>{
      console.log(err);
       //this.errormsg=true;
      alert("Error in fetching user");
    })
  }


}
