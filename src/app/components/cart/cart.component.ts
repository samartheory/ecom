import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductGetService } from 'src/app/services/product-get.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent {
 allProducts:any;
 productList:any;
 inCart:any[] = [];
 totalPrice:any;
@ViewChild('quantity') inputQuantity!: ElementRef<HTMLInputElement>;

 constructor(private productData : ProductGetService, public addToCart : AddToCartService,public toast:ToastService,private login:LoginService){
  productData.products().subscribe((data)=>{
    this.allProducts = data;
    this.productList = this.allProducts.products;
    this.updateCart()
  });
 }
 
//  getAllItemsInCart(){
//   console.log('in',this.productList)
//   let temp:any[] = [];
//   for(let obj of this.productList){
//     let quantityIfExist = localStorage.getItem(obj.id)
//     if(quantityIfExist && parseInt(quantityIfExist) > 0){
//       temp.push(obj)
//     }
//   }
//   return temp;
//  }
 updateCart(){
  let temp:any[]=[]
    for(let obj of this.productList){
      let quantityIfExist = localStorage.getItem(obj.id)
      if(quantityIfExist && parseInt(quantityIfExist) > 0){
        temp.push(obj)
      }
    }
    this.inCart = temp
    this.updateTotalPrice()
 }

 commas(price:number){
  return price.toLocaleString();
 }

 updateQuantity(id:any,element:any){  
  let newQuantity:any = element.value
  if(parseInt(newQuantity) > 0){
    this.addToCart.updateQuantity(id,newQuantity)
    this.updateCart()
  }
  else if(typeof(parseInt(newQuantity)) == 'number'){
    let quan:any = this.addToCart.getQuantity(id)
    element.value = quan
  }
 }

 increaseQuantity(id:any){
  this.addToCart.increaseQuantity(id)
  this.updateCart()
 }

 decreaseQuantity(id:any){
  this.addToCart.decreaseQuantity(id)
  this.toShow(id)
  this.updateCart()
 }

 removeItem(id:any){
  this.addToCart.removeItem(id)
  this.toShow(id)
  this.updateCart()
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

 clearCart(){
  this.addToCart.clearCart(this.allProducts)
  this.toast.handleSuccess("Cart Cleared")
  this.updateCart()
 }

 itemQuantity(id:any){
  return localStorage.getItem(id)
 }

 updateTotalPrice(){
  let total:number = 0
  for(let obj of this.inCart){
    let quan = this.addToCart.getQuantity(obj.id)
    if(quan)
      total += parseInt(obj.price)*parseInt(quan)
  }
  this.totalPrice = total
 }

 userLoggedIn(){
  return this.login.isLoggedIn()
 }
}
