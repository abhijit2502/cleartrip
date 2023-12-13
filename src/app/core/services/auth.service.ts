import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  addUserDetails(userObj:any){
    let userDetails = JSON.stringify(userObj);
    sessionStorage.setItem("userInfo",userDetails)
  }

  getUserDetails(){
    let userInfo=sessionStorage.getItem("userInfo");
    if(userInfo != null){
      userInfo = JSON.parse(userInfo)
    }
    return userInfo;
  }
}
