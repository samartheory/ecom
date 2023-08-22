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
  fromCart:any
  constructor(private login:LoginService,private router:Router,private toast:ToastService,private location:Location,private route:ActivatedRoute){
    if(login.isLoggedIn()){
      router.navigate(['/products'])
    }
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.fromCart = params['fromCart'];
    });
  }
  submit(form:HTMLFormElement){
    if(this.login.loginAttempt(form['email'],form['password'])){
      if(this.fromCart === "yes"){        
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
// todo add current user login name
// todo redirect user to product page when loggedin
// todo dropdown for logout
// todo partition of guest cart and user cart and merge them accordingly
// todo add footer

//todo when user is not logged in show login icon with login text