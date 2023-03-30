export interface User{
  id:string,
  email:string,
  password:string,
  resume:string
}

export interface loginData{
  message:string,
  token:string,
  resume:string,
  success:boolean,
  id:string
}

export interface userData{
  message:string,
  username:string,
  email:string,
  resumeLink:string
}
