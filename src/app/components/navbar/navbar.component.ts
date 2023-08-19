import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductGetService } from 'src/app/services/product-get.service';

let allProducts:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  isDropdownOpen = false;
  constructor(private router: Router,public addToCart : AddToCartService,private productData : ProductGetService,public login:LoginService)
   {
    productData.products().subscribe((data)=>{
      allProducts = data;
    });
  }

  redirectToCart(){
    this.router.navigate(['/cart'])
  }

  redirectToProducts(){
    this.router.navigate(['/products'])
  }

  getTotal(){
    return this.addToCart.getTotalItemsInCart()
  }

  redirectLogin(){
    if(this.login.isLoggedIn()){
      this.router.navigate(['/loggedin'])
    }
    else{
      this.router.navigate(['/login'])
    }
  }

  logOut(){
    this.login.logOut()
  }
}
