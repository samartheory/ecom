import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  constructor(private login:LoginService) { }
  // toDisplay(id: any) {
  //   const quantity = localStorage.getItem(id)
  //   if (quantity) {
  //     return false;
  //   }
  //   else {
  //     return true;
  //   }
  // }

  // getQuantity(id: any) {
  //   return localStorage.getItem(id)
  // }

  // getTotalItemsInCart(allProducts:any){
  //   let nos = 0
  //   if(allProducts){
  //   for(let obj of allProducts){
  //     if(localStorage.getItem(obj.id)){
  //       nos++
  //     }
  //   }
  // }
  //   return nos
  // }

  // updateQuantity(id: any, newQuantity: any) {
  //   let oldQuantity: any = localStorage.getItem(id)
  //   if (oldQuantity) {
  //     if(parseInt(newQuantity) == 0){
  //       this.removeItem(id)
  //     }
  //     else{
  //     localStorage.setItem(id, (parseInt(newQuantity)).toString())
  //     }
  //   }
  // }

  // increaseQuantity(id: any) {
  //   let oldQuantity: any = localStorage.getItem(id)
  //   if (oldQuantity) {
  //     localStorage.setItem(id, (parseInt(oldQuantity) + 1).toString())
  //   }
  //   else {
  //     localStorage.setItem(id, '1')
  //   }
  // }

  // decreaseQuantity(id: any) {
  //   let oldQuantity: any = localStorage.getItem(id)
  //   if (oldQuantity) {
  //     if (oldQuantity == '1') {
  //       this.removeItem(id)
  //     }
  //     else {
  //       localStorage.setItem(id, (parseInt(oldQuantity) - 1).toString())
  //     }
  //   }
  //   else {
  //     localStorage.setItem(id, '1')
  //   }
  // }

  // removeItem(id: any){
  //   localStorage.removeItem(id)
  // }

  // clearCart(allProducts:any){
  //   for(let obj of allProducts){
  //     if(localStorage.getItem(obj.id)){
  //       this.removeItem(obj.id)
  //     }
  //   }
  // }


  // NEW CART FUNCTIONS //

  createGuestCart(){
    localStorage.setItem("guestCart","[]")
  }

  createUserCart(email:string){
    localStorage.setItem(email,"{}")
  }

  mergeCarts(){
    let email:any
    if(this.login.getEmail()){
      email = this.login.getEmail()
    }
    let guestJsonString:any = localStorage.getItem("guestCart")
    let userJsonString:any = localStorage.getItem(email)
    let guestJson:any = JSON.parse(guestJsonString)
    let userJson:any = JSON.parse(userJsonString)

    for(let gObj of guestJson){
      let ifPresent:boolean = false
      for(let uObj of userJson){
        if(gObj.id == uObj.id){
          uObj.quantity = parseInt(uObj.quantity) + parseInt(gObj.quantity)
          ifPresent = true
          break
        }
      }
      if(!ifPresent){
        userJson.push(gObj)
      }
    }

    userJsonString = JSON.stringify(userJson)
    localStorage.setItem(email,userJsonString)
    localStorage.setItem("guestCart","[]")
  }

  addNewItem(id:string){
    let cartType:any = this.getCartType()
    let jsonString:any = localStorage.getItem(cartType)
    let jsonObj:any = JSON.parse(jsonString)
    let item:any = {"id":id,"quantity":"1"}
    jsonObj.push(item)
    localStorage.setItem(cartType,JSON.stringify(jsonObj))
  }

  increaseQuantity(id:string){
    let cartType:any = this.getCartType()
    let jsonString:any = localStorage.getItem(cartType)
    let jsonObj:any = JSON.parse(jsonString)
    for(let obj of jsonObj){
      if(obj.id == id){
        obj.quantity = parseInt(obj.quantity) + 1
        break
      }
    }
    localStorage.setItem(cartType,JSON.stringify(jsonObj))
  }

  decreaseQuantity(id:string){
    let cartType:any = this.getCartType()
    let jsonString:any = localStorage.getItem(cartType)
    let jsonObj:any = JSON.parse(jsonString)
    for(let obj of jsonObj){
      if(obj.id == id){      
        if(parseInt(obj.quantity) == 1){
        console.log(obj.id,id);
          jsonObj = jsonObj.filter((item:any) => item.id != id)//changing jsonObj while iterting
          console.log((jsonObj));
          
        }
        else{
        obj.quantity = parseInt(obj.quantity) - 1
        }
        break;
      }
    }
    localStorage.setItem(cartType,JSON.stringify(jsonObj))
  }

  removeItem(id:string){
    let cartType:any = this.getCartType()
    let jsonString:any = localStorage.getItem(cartType)
    let jsonObj:any = JSON.parse(jsonString)
    jsonObj = jsonObj.filter((item:any) => item.id !== id)
    localStorage.setItem(cartType,JSON.stringify(jsonObj))
  }

  getCartType(){
    let cartType:any = "guestCart"
    if(this.login.isLoggedIn()){
      if(this.login.getEmail()){
        let email:any = this.login.getEmail()
        cartType = email
      }
    }
    return cartType
  }

  clearCart(){
    let cartType:any = this.getCartType()
    localStorage.setItem(cartType,"[]")
  }

  toDisplay(id:any){
    let cartType:any = this.getCartType()
    let jsonString:any = localStorage.getItem(cartType)
    let jsonObj:any = JSON.parse(jsonString)
    for(let obj of jsonObj){
      if(obj.id == id){
        return false
      }
    }
    return true
  }

  getQuantity(id: any){
    let cartType:any = this.getCartType()
    let jsonString:any = localStorage.getItem(cartType)
    let jsonObj = JSON.parse(jsonString)
    for(let obj of jsonObj){
      if(obj.id == id){
        return obj.quantity
      }
    }
  }

  getTotalItemsInCart(){
    let cartType:any = this.getCartType()
    let jsonString:any = localStorage.getItem(cartType)
    let jsonObj:any = JSON.parse(jsonString)
    return jsonObj.length
  }

  updateQuantity(id: any, newQuantity: any){
    if(parseInt(newQuantity) == 0){
      this.removeItem(id)
      return
    }
    let cartType:any = this.getCartType()
    let jsonString:any = localStorage.getItem(cartType)//todo put string and object in one line
    let jsonObj:any = JSON.parse(jsonString)
    //todo include parse fail case and clear the cart / create a new fucntion
    for(let obj of jsonObj){
      if(obj.id == id){
        obj.quantity = newQuantity
      }
    }
    //todo validate before fetching from local storage everywhere and in case of corruption clear the cart
    localStorage.setItem(cartType,JSON.stringify(jsonObj))//todo remove the item if the value is invalid
  }
}
