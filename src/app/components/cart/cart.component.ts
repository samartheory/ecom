import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { CsvService } from 'src/app/services/csv.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductGetService } from 'src/app/services/product-get.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent {
 productList:any;
 inCart:any[] = [];
 totalPrice:any;
@ViewChild('quantity') inputQuantity!: ElementRef<HTMLInputElement>;

 constructor(private productGetService : ProductGetService, public addToCart : AddToCartService,public toast:ToastService,private login:LoginService,private router:Router,private csv:CsvService){
  productGetService.getProducts().subscribe((data)=>{
    let allProducts:any
    allProducts = data;
    this.productList = allProducts.products;
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
      let quantityIfExist = this.addToCart.getQuantity(obj.id)
      if(quantityIfExist && parseInt(quantityIfExist) > 0){
        temp.push(obj)
      }
    }
    this.inCart = temp
    this.updateTotalPrice()
    // todo optimize this iteration
 }

 updateQuantity(id:any,element:any){  
  let newQuantity:any = element.value
  if(parseInt(newQuantity) >= 0){
    this.addToCart.updateQuantity(id,newQuantity)
    this.updateCart()
  }
  else if(typeof(parseInt(newQuantity)) == 'number'){
    let quan:any = this.addToCart.getQuantity(id)
    element.value = quan
  }
 }
// todo to make json strings in local storage
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
// todo validation while retreiving the quantity from local storage
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
  this.addToCart.clearCart()
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

 placeOrder(){
  if(this.login.isLoggedIn()){
    this.csv.convertJSONToCSV(this.inCart)
    this.addToCart.clearCart()
  }
  else{
    this.router.navigate(['/login'],{queryParams:{fromCart:"yes"}})
  }
 }

 getTotal(id:any,price:any){
  let quan:any = this.addToCart.getQuantity(id)
  return (parseInt(quan) * price)
 }
}
