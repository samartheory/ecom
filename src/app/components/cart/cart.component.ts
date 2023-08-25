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
 private productList:any;
 public inCart:any[] = [];
 public totalPrice:any;

 constructor(private productGetService : ProductGetService, public addToCart : AddToCartService,public toast:ToastService,private login:LoginService,private router:Router,private csv:CsvService){
  productGetService.getProducts().subscribe((data)=>{
    let allProducts:any;
    allProducts = data;
    this.productList = allProducts?.products;
    this.updateCart();
  });
 }
 
 updateCart(){
  let temp:any[]=[]
    for(let obj of this.productList){
      let quantityIfExist = this.addToCart.getQuantity(obj?.id);
      if(quantityIfExist && parseInt(quantityIfExist) > 0) temp.push(obj);
    }
    this.inCart = temp;
    this.updateCartTotal();
 }

 updateQuantity(id:any,element:any){  
  let newQuantity:any = element?.value;
  if(isNaN(newQuantity)){
    this.toast.handleError("Quantity received is invalid");
    return;
  }
  if(parseInt(newQuantity) < 0 || !(parseFloat(newQuantity)%1 == 0) || newQuantity.toString().includes('e')){
    let quan:any = this.addToCart.getQuantity(id);
    element.value = quan;
    this.toast.handleError((parseInt(newQuantity) < 0)?"Quantity can't be negative":
    (!(parseFloat(newQuantity)%1 == 0)?"Quantity should not be fractional":"Scientific notation not allowed"));
    return;
  }
  if(parseInt(newQuantity) > 99){ 
    this.toast.handleError("Max quantity can not be more than 99");
    newQuantity = 99;
  }
  this.addToCart.updateQuantity(id,newQuantity);
  this.updateCartTotal();
 }

 increaseQuantity(id:any){
  this.addToCart.increaseQuantity(id);
  this.updateCart();
 }

 decreaseQuantity(id:any){
  this.addToCart.decreaseQuantity(id);
  this.updateCart();
 }

 removeItem(id:any){
  this.addToCart.removeItem(id);
  this.updateCart();
 }

 clearCart(){
  this.addToCart.clearCart();
  this.toast.handleSuccess("Cart Cleared");
  this.updateCart();
 }

 itemQuantity(id:any){
  return localStorage.getItem(id);
 }

 updateCartTotal(){
  let total:number = 0;
  for(let obj of this.inCart){
    let quan = this.addToCart.getQuantity(obj?.id);
    total += parseInt(obj?.price)*parseInt(quan);
  }
  this.totalPrice = total;
 }

 placeOrder(){
  if(this.login.isLoggedIn()){
    this.csv.convertJSONToCSV(this.inCart);
    this.addToCart.clearCart();
    return;
  }
  this.toast.handleError("Please Login");
  this.router.navigate(['/login'],{queryParams:{fromCart:"yes"}});
 }

 getQuantityTotal(id:any,price:any){
  let quan:any = this.addToCart.getQuantity(id);
  return (parseInt(quan) * price);
 }
}
