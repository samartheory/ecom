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
  priceMax:number = 150000
  priceMin:number = 0
  currentRating:number = 0
  sortedIn:string = 'none'
  constructor(private productGetService : ProductGetService,public addToCart:AddToCartService,public toast:ToastService){
    //todo correcting service/function naming convention
    productGetService.getProducts().subscribe((data)=>{
      this.allProducts = data;
      this.productList = this.allProducts?.products;
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
    this.priceMax = form['price-max']; 
    this.priceMin = form['price-min']; 
    this.currentRating = form['rating'];//todo convert reactive form into template forms
    if(this.priceMin > this.priceMax){
      this.toast.handleError("Min price can't be greater than max price")
      return
    }
    this.productList = this.applyFilter()
    this.preSort()
  }

  updateQuantity(id:any,element:any){  
    let newQuantity:any = element.value
    if(isNaN(newQuantity)){
      this.toast.handleError("Quantity received is invalid")
      return
    }
    if(parseInt(newQuantity) < 0 || !(parseFloat(newQuantity)%1 == 0)){
      let quan:any = this.addToCart.getQuantity(id)
      element.value = quan//todo throw a toast for -ve values
      if(parseInt(newQuantity) < 0) this.toast.handleError("Quantity can't be negative")
      else this.toast.handleError("Quanity should not be fractional")
      return
    }//todo decimal should not pass
    this.addToCart.updateQuantity(id,newQuantity)
   }

  lowToHighSort(){
    this.productList.sort((a:any,b:any)=> a?.price - b?.price);
    this.sortedIn = "lowToHighSort";
  }

  highToLowSort(){
    this.productList.sort((a:any,b:any)=> b?.price - a?.price);
    this.sortedIn = "highToLowSort";
  }

  ratingSort(){
    this.productList.sort((a:any,b:any)=> b?.rating - a?.rating);
    this.sortedIn = "ratingSort";
  }

  alphabeticallySort(){
    this.productList.sort((a:any,b:any)=> a?.title.localeCompare(b?.title));
    this.sortedIn = "alphabeticallySort";
  }

  preSort(){
    switch (this.sortedIn) {
      case 'lowToHighSort':
        this.lowToHighSort()
        break;
      case 'highToLowSort':
        this.highToLowSort()
        break;
      case 'ratingSort':
        this.ratingSort()
        break;
      case 'alphabeticallySort':
        this.alphabeticallySort()
        break;
      default:
        return;
    }
  }
  
  applyFilter(){
    let afterFilter:any = []
    for(let item of this.allProducts?.products){
      if(item?.price < this.priceMax && item?.price >= this.priceMin && item?.rating >= this.currentRating)
        afterFilter.push(item)
    }
    return afterFilter
    // return this.allProducts.products.filter((item:any) => item.price <= this.priceMax && 
    // item.price <= this.priceMin && item.rating >= this.currentRating);
  }
}
