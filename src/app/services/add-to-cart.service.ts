import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  constructor() { }
  toDisplay(id: any) {
    const quantity = localStorage.getItem(id)
    if (quantity) {
      return false;
    }
    else {
      return true;
    }
  }

  getQuantity(id: any) {
    return localStorage.getItem(id)
  }

  getTotalItemsInCart(allProducts:any){
    let nos = 0
    if(allProducts){
    for(let obj of allProducts.products){
      if(localStorage.getItem(obj.id)){
        nos++
      }
    }
  }
    return nos
  }

  updateQuantity(id: any, newQuantity: any) {
    let oldQuantity: any = localStorage.getItem(id)
    if (oldQuantity) {
      if(parseInt(newQuantity) == 0){
        this.removeItem(id)
      }
      else{
      localStorage.setItem(id, (parseInt(newQuantity)).toString())
      }
    }
  }

  increaseQuantity(id: any) {
    let oldQuantity: any = localStorage.getItem(id)
    if (oldQuantity) {
      localStorage.setItem(id, (parseInt(oldQuantity) + 1).toString())
    }
    else {
      localStorage.setItem(id, '1')
    }
  }

  decreaseQuantity(id: any) {
    let oldQuantity: any = localStorage.getItem(id)
    if (oldQuantity) {
      if (oldQuantity == '1') {
        this.removeItem(id)
      }
      else {
        localStorage.setItem(id, (parseInt(oldQuantity) - 1).toString())
      }
    }
    else {
      localStorage.setItem(id, '1')
    }
  }

  removeItem(id: any){
    localStorage.removeItem(id)
  }

  clearCart(allProducts:any){
    for(let obj of allProducts.products){
      if(localStorage.getItem(obj.id)){
        this.removeItem(obj.id)
      }
    }
  }
}
