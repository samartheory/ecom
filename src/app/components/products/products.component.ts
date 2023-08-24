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
  private allProducts:any;
  public productList : any;
  public priceMax:number = 150000
  public priceMin:number = 0
  public currentRating:number = 0
  public sortedIn:string = 'alphabeticallySort'
  constructor(private productGetService : ProductGetService,public addToCart:AddToCartService,public toast:ToastService){
    productGetService.getProducts().subscribe((data)=>{
      this.allProducts = data;
      this.productList = this.allProducts?.products;
      this.preSort()
    });
  }

  updateProducts(form:any){    
    this.priceMax = form?.['price-max']; 
    this.priceMin = form?.['price-min']; 
    this.currentRating = form?.['rating'];
    if(!this.validateFilterValues()) return;
    if(this.priceMin > this.priceMax){
      this.toast.handleError("Min price can't be greater than max price")//todo reset(function) the values for invalid price
      this.priceMin = this.priceMax;
      return;
    }
    this.productList = this.applyFilter()
    this.preSort()
    this.toast.handleSuccess("Filter Applied")
  }

  updateQuantity(id:any,element:any){  
    let newQuantity:any = element.value
    if(isNaN(newQuantity)){
      this.toast.handleError("Quantity received is invalid")
      return
    }
    if(parseInt(newQuantity) < 0 || !(parseFloat(newQuantity)%1 == 0)){
      let quan:any = this.addToCart.getQuantity(id)
      element.value = quan
      this.toast.handleError((parseInt(newQuantity) < 0)?"Quantity can't be negative":"Quanity should not be fractional")
      return
    }
    if(parseInt(newQuantity) > 99){ 
      this.toast.handleError("Max quantity can not be more than 99")
      newQuantity = 99;
    }
    this.addToCart.updateQuantity(id,newQuantity)
   }
//todo to limit quantity to 99
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

  resetFilter(){
    this.priceMin = 0
    this.priceMax = 150000
    this.currentRating = 0
    this.productList = this.allProducts.products
    this.sortedIn = "alphabeticallySort"
  }

  validateFilterValues(){
    console.log(this.priceMin);
    
    if(this.priceMin < 0){
      this.toast.handleError("Min price can not be negative");
      return false;
    }
    if(this.priceMax < 0){
      this.toast.handleError("Max price can not be negative");
      return false;
    }
    if(isNaN(this.priceMin) || isNaN(this.priceMax)){

      this.toast.handleError("Price should be a number")
      return false;
    }
    return true;
  }
}

//todo reset all filters
//todo add categories filter
//todo remove filter button
//todo toast for succesful filter
//todo change the min max filter layout
//todo add the hover pointer buttons

//todo add semicolon