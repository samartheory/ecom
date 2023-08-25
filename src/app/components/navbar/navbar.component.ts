import { Location } from '@angular/common';
import { Component, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductGetService } from 'src/app/services/product-get.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  private allProducts:any;
  constructor(private router: Router,public addToCart : AddToCartService,private productGetService : ProductGetService,public login:LoginService,public location:Location)
   {
    productGetService.getProducts().subscribe((data)=>{
      this.allProducts = data;
    });
  }

  redirectToCart(){
    this.router.navigate(['/cart']);
  }

  redirectToProducts(){
    this.router.navigate(['/products']);
  }

  getTotal(){
    return this.addToCart.getTotalItemsInCart();
  }

  redirectLogin(){
      this.router.navigate(['/login']);
  }

  logOut(){
    this.login.logOut();
    this.router.navigate(['/login']);
  }

  getUsername(){
    return this.login.getEmail();
  }

  ifLogin(){
    if(this.location.path() == '/login') return false;
    return true;
  }

  ifLoggedIn(){
    if(this.location.path() == '/login')return false;
    return this.login.isLoggedIn();
  }
}
