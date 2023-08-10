import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  users:any
  usersData:any
  constructor(private http:HttpClient) { 
    this.users = this.http.get('../../assets/users.json')
    this.users.subscribe((data:any)=>{
      this.usersData = data;
    });
  }

  loginAttempt(email: string, password: string) {
    console.log(this.usersData)
    for(let obj of this.usersData){
      if(email == obj.email && password == obj.password){
        localStorage.setItem("loggedIn","true")
        localStorage.setItem("email",email)
        return true
      }
    }
    return false
  }

  getEmail(){
    return localStorage.getItem("email")
  }

  logOut(){
    localStorage.setItem("loggedIn","false")
    localStorage.removeItem("email")
  }

  isLoggedIn(){
    return localStorage.getItem("loggedIn") == "true" ? true : false 
  }
}
