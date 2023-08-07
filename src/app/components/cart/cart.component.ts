import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { ProductGetService } from 'src/app/services/product-get.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent {
 allProducts:any;
 productList:any;
 inCart:any[] = [];
@ViewChild('quantity') inputQuantity!: ElementRef<HTMLInputElement>;

 constructor(private productData : ProductGetService, public addToCart : AddToCartService){
  productData.products().subscribe((data)=>{
    this.allProducts = data;
    this.productList = this.allProducts.products;
    this.updateCart();
  });
 }
 
 getAllItemsInCart(){
  let temp:any[] = [];
  for(let obj of this.productList){
    let quantityIfExist = localStorage.getItem(obj.id)
    if(quantityIfExist && parseInt(quantityIfExist) > 0){
      temp.push(obj)
    }
  }
  return temp;
 }
 updateCart(){
    for(let obj of this.productList){
      let quantityIfExist = localStorage.getItem(obj.id)
      if(quantityIfExist && parseInt(quantityIfExist) > 0){
        this.inCart.push(obj)
      }
    }
 }

 commas(price:number){
  return price.toLocaleString();
 }

 updateQuantity(id:any,element:any){  
  let newQuantity:any = element.value
  if(parseInt(newQuantity) > 0){
    this.addToCart.updateQuantity(id,newQuantity)
  }
  else if(typeof(parseInt(newQuantity)) == 'number'){
    let quan:any = this.addToCart.getQuantity(id)
    element.value = quan
  }
 }

 increaseQuantity(id:any){
  this.addToCart.increaseQuantity(id)
 }

 decreaseQuantity(id:any){
  this.addToCart.decreaseQuantity(id)
  this.toShow(id)
 }

 removeItem(id:any){
  this.addToCart.removeItem(id)
  this.toShow(id)
 }
 toShow(id:any){
  let quan: any = this.addToCart.getQuantity(id) 
  if(quan && quan > 0){
    return true;
  }
  else{
    return false;
  }
 }
}
