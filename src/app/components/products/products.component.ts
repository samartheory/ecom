import { Component } from '@angular/core';
import { ProductGetService } from 'src/app/services/product-get.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  allProducts:any;
  productList : any;
  reqProduct:any;
  currentPrice:number = 200000
  currentRating:number = 0
  constructor(private productGet : ProductGetService,public addToCart:AddToCartService,public toast:ToastService){
    //todo correcting service/function naming convention
    productGet.products().subscribe((data)=>{
      this.allProducts = data;
      this.productList = this.allProducts.products;
      
      // console.log(this.productList)
    });
  }

  // filterForm = new FormGroup({
  //   price : new FormControl(200000),
  //   rating : new FormControl(0)
  // })
  // todo correct function identation
  updateProducts(form:any){    
    // let currentPrice:any = 1, currentRating:any = 0 //todo convert any to number for obvious variables
    this.currentPrice = form['price']; 
    this.currentRating = form['rating'];//todo convert reactive form into template forms
    // this.productList = this.allProducts.products.filter((num:any) => num.price <= this.currentPrice)
    // this.productList = this.productList.filter((num:any) => num.rating >= this.currentRating)//todo optimize filtering
    this.productList = this.allProducts.products.filter(
      (num:any) => num.price <= this.currentPrice && num.rating >= this.currentRating
    );
  }

  updatePriceFilter(spy:any){
    this.currentPrice = spy.value
  }

  updateRatingFilter(spy:any){
    this.currentRating = spy.value
  }

  updateQuantity(id:any,element:any){  
    let newQuantity:any = element.value
    if(parseInt(newQuantity) >= 0){
      this.addToCart.updateQuantity(id,newQuantity)
    }
    else {//todo remove the number validation use isNaN
      let quan:any = this.addToCart.getQuantity(id)
      element.value = quan//todo throw a toast for -ve values
    }
   }

  lowToHighSort(){
    this.productList.sort((a:any,b:any)=> a.price - b.price)
  }
  highToLowSort(){
    this.productList.sort((a:any,b:any)=> b.price - a.price)
  }
  ratingSort(){
    this.productList.sort((a:any,b:any)=> b.rating - a.rating)
  }
  alphabeticallySort(){//todo change the names
    this.productList.sort((a:any,b:any)=> a.title.localeCompare(b.title))
  }
  // get allProducts() {
  //   return allProducts;
  // }
  // set allProducts(newPro){
  //   allProducts = newPro
  // }
}
