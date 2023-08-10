import { Component } from '@angular/core';
import { ProductGetService } from 'src/app/services/product-get.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { CurrencyPipe } from '@angular/common';
import { ToastService } from 'src/app/services/toast.service';

let allProducts:any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  productList : any;
  reqProduct:any;
  quanMap = new Map<string,string>();
  constructor(private productData : ProductGetService,public addToCart:AddToCartService,public toast:ToastService){
    productData.products().subscribe((data)=>{
      this.allProducts = data;
      this.productList = allProducts.products;
      // console.log(this.productList)
    });
  }
  filterForm = new FormGroup({
    price : new FormControl(200000),
    rating : new FormControl(0)
  })
  updateProducts(){
    let currentPrice:any = 1, currentRating:any = 0
    currentPrice = this.filterForm.get('price')?.value; 
    currentRating = this.filterForm.get('rating')?.value;
    this.productList = allProducts.products.filter((num:any) => num.price <= currentPrice)
    this.productList = this.productList.filter((num:any) => num.rating >= currentRating)
  }
  randomNumber(){
    return (Math.random()*5.0).toFixed(1);
  }
  aToZSort(){
    this.productList.sort((a:any,b:any)=> a.price - b.price)
  }
  ztoASort(){
    this.productList.sort((a:any,b:any)=> b.price - a.price)
  }
  ratingSort(){
    this.productList.sort((a:any,b:any)=> b.rating - a.rating)
  }
  alphabeticallySort(){
    this.productList.sort((a:any,b:any)=> a.title.localeCompare(b.title))
  }
  get allProducts() {
    return allProducts;
  }
  set allProducts(newPro){
    allProducts = newPro
  }
  updatePrice(newPrice: string) {
    const priceControl = this.filterForm.get('price');
    if (priceControl) {
      priceControl.setValue(Number(newPrice));
    }
  }
}
