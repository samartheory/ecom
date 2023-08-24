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
  private fromCart:any
  constructor(private login:LoginService,private router:Router,private toast:ToastService,private location:Location,private route:ActivatedRoute){
    if(login.isLoggedIn()) router.navigate(['/products'])
  }
  
  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.fromCart = params['fromCart'];
    });
  }

  submit(form:HTMLFormElement){
    if(this.login.loginAttempt(form['email'],form['password'])){
      this.fromCart === "yes" ? this.router.navigate(['/cart']) : this.router.navigate(['/products'])
      this.toast.handleSuccess("Logged In!")
      return;
    }
    this.toast.handleError("Invalid Credentials")
  }
}
