import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent {
  constructor(private login:LoginService,private router:Router,private toast:ToastService){
    
  }

  logOut(){
    this.login.logOut()
    this.toast.handleSuccess("Logged Out")
    this.router.navigate(['/login'])
  }
  getEmail(){
    return this.login.getEmail()
  }
}
