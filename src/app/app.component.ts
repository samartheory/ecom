import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(){
      if(!localStorage.getItem("loggedIn"))
      localStorage.setItem("loggedIn","false")

      if(!localStorage.getItem("guestCart"))
      localStorage.setItem("guestCart","[]")
    }
}
