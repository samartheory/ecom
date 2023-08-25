import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddToCartService } from './add-to-cart.service';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private users:any;
  private usersData:any;
  constructor(private http:HttpClient,private router:Router) { 
    this.users = this.http.get('../../assets/users.json');
    this.users.subscribe((data:any)=>{
      this.usersData = data;
    });
  }

  loginAttempt(email: string, password: string) {
    for(let obj of this.usersData){
      if(email == obj.email && password == obj.password){
        localStorage.setItem("loggedIn","true");
        localStorage.setItem("email",email);
        if(!localStorage.getItem(email)){
          localStorage.setItem(email,"[]");
        }
        this.mergeCarts();
        return true;
      }
    }
    return false;
  }

  getEmail(){
    if(localStorage.getItem("email")){ 
      let email:any = localStorage.getItem("email");
      if(!localStorage.getItem(email)){
        this.logOut();
        this.router.navigate(['/login']);
        return false;
      }
      return localStorage.getItem("email");
    }
    this.logOut();
    this.router.navigate(['/login']);
    return false;
  }

  logOut(){
    localStorage.setItem("loggedIn","false");
    localStorage.removeItem("email");
  }

  isLoggedIn(){
    return localStorage.getItem("loggedIn") == "true" ? true : false;
  }

  mergeCarts(){
    let email:any;
    if(this.getEmail()){
      email = this.getEmail();
    }
    let guestJsonString:any = localStorage.getItem("guestCart");
    let userJsonString:any = localStorage.getItem(email);
    let guestJson:any = JSON.parse(guestJsonString);
    let userJson:any = JSON.parse(userJsonString);

    for(let gObj of guestJson){
      let ifPresent:boolean = false;
      for(let uObj of userJson){
        if(gObj.id == uObj.id){
          uObj.quantity = parseInt(uObj.quantity) + parseInt(gObj.quantity);
          ifPresent = true;
          break;
        }
      }
      if(!ifPresent){
        userJson.push(gObj);
      }
    }

    userJsonString = JSON.stringify(userJson);
    localStorage.setItem(email,userJsonString);
    localStorage.setItem("guestCart","[]");
  }
}
