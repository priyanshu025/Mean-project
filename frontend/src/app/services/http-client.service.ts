import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {User, userData} from '../Models/user'
import {loginData} from '../Models/user';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  url="http://localhost:3000/user"
  constructor(private http:HttpClient,private auth:AuthserviceService) { }

  userSignup(formData:FormData):Observable<{}>{
    return this.http.post<{}>(this.url+'/signup',formData);
  }

  userLogin(rawData:any):Observable<loginData>{
      return this.http.post<loginData>(this.url+'/login',rawData);
  }

  getUser(id:string):Observable<userData>{
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     Authorization: 'my-auth-token'
    //   })
      const httpOptions={
           headers:new HttpHeaders({
            'content-Type': 'application/json',
             Authorization: 'bearer '+this.auth.accessToken
           })
      }
      return this.http.get<userData>(this.url+`/${id}`,httpOptions);
  }
}
