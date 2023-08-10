import { Location } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private login:LoginService,private router:Router,private toast:ToastService,private location:Location){

  }
  // @ViewChild('emailSpy') emailSpy : any;

  // getEmail(){
  //   console.log(this.emailSpy?.invalid)
  //   if(this.emailSpy?.invalid){
  //     console.log("Email is required ");
  //   }
  // }
  // checkValid(){
  //   if(this.emailSpy.valid){
  //     console.log("email is valid")
  //   }else{
  //     console.log("email is invalid")
  //   }
  // }
  submit(form:HTMLFormElement){
    if(this.login.loginAttempt(form['email'],form['password'])){
      if(this.location.path()){
        this.router.navigate(['/cart'])
      }
      else{
      this.router.navigate(['/products'])
      }
      this.toast.handleSuccess("Logged In!")
    }
    else{
      this.toast.handleError("Invalid Credentials")
    }
  }
}
