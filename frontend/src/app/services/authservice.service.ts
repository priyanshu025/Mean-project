import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  authenticate!:boolean;
  accessToken='';
  id!: string;
  constructor() {
    console.log(" auth service created");
  }

  isLoggedIn(success:Boolean){
      if(success)
        this.authenticate=true;
      else
        this.authenticate=false;
  }
  // setId(id:any){
  //      this.id=id;
  // }
}
