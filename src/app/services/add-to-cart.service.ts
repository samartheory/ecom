import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  constructor(private login:LoginService) { }

  mergeCarts(){
    let email:any,
    guestJson:any = this.validateJSON(localStorage.getItem("guestCart")),
    userJson:any = this.validateJSON(localStorage.getItem(email));
    if(this.login.getEmail()) email = this.login.getEmail();
    for(let gObj of guestJson){
      let ifPresent:boolean = false;
      for(let uObj of userJson){
        if(gObj?.id == uObj?.id){
          uObj.quantity = parseInt(uObj?.quantity) + parseInt(gObj?.quantity);
          ifPresent = true;
          break;
        }
      }
      if(!ifPresent) userJson.push(gObj)  ;
    }
    localStorage.setItem(email,JSON?.stringify(userJson));
    localStorage.setItem("guestCart","[]");
  }

  addNewItem(id:string){
    let cartType:any = this.getCartType()
    ,jsonObj:any = this.validateJSON(localStorage.getItem(cartType));
    jsonObj.push({"id":id,"quantity":"1"});
    localStorage.setItem(cartType,JSON.stringify(jsonObj));
  }

  increaseQuantity(id:string){
    let cartType:any = this.getCartType();
    let jsonObj:any = this.validateJSON(localStorage.getItem(cartType));
    for(let obj of jsonObj){
      if(obj?.id == id && parseInt(obj?.quantity) < 99){
        obj.quantity = parseInt(obj?.quantity) + 1;
        break;
      }
    }
    localStorage.setItem(cartType,JSON.stringify(jsonObj));
  }

  decreaseQuantity(id:string){
    let cartType:any = this.getCartType();
    let jsonObj:any = this.validateJSON(localStorage.getItem(cartType));
    for(let obj of jsonObj){
      if(obj?.id == id){      
        if(parseInt(obj?.quantity) == 1){
          jsonObj = jsonObj.filter((item:any) => item?.id != id);//changing jsonObj while iterting 
          break;         
        }
        obj.quantity = parseInt(obj?.quantity) - 1;
      }
    }
    localStorage.setItem(cartType,JSON.stringify(jsonObj));
  }

  removeItem(id:string){
    let cartType:any = this.getCartType()
    ,jsonObj:any = this.validateJSON(localStorage.getItem(cartType));
    jsonObj = jsonObj.filter((item:any) => item?.id !== id);
    localStorage.setItem(cartType,JSON.stringify(jsonObj));
  }

  getCartType(){

    return this.login.isLoggedIn() ? this.login?.getEmail() : "guestCart";
  }

  clearCart(){
    let cartType:any = this.getCartType();
    localStorage.setItem(cartType,"[]");
  }

  toDisplay(id:any){
    let cartType:any = this.getCartType();
    let jsonObj:any = this.validateJSON(localStorage.getItem(cartType));
    for(let obj of jsonObj){
      if(obj?.id == id) return false;
    }
    return true;
  }

  getQuantity(id: any){
    let cartType:any = this.getCartType()
    ,jsonObj = this.validateJSON(localStorage.getItem(cartType));
    for(let obj of jsonObj){
      if(obj?.id == id) return obj.quantity;
    }
  }

  getTotalItemsInCart(){
    let cartType:any = this.getCartType();
    let jsonObj:any = this.validateJSON(localStorage.getItem(cartType));
    return jsonObj.length;
  }

  updateQuantity(id: any, newQuantity: any){
    if(parseInt(newQuantity) == 0){
      this.removeItem(id);
      return;
    }
    let cartType:any = this.getCartType();
    let jsonObj:any = this.validateJSON(localStorage.getItem(cartType));

    for(let obj of jsonObj){
      if(obj?.id == id){
        obj.quantity = newQuantity;
      }
    }
    localStorage.setItem(cartType,JSON.stringify(jsonObj));
  }

  //new
  validateJSON(jsonString:any){
    let jsonObj:any = [],
    correctJsonObj:any = [];
    try{
      jsonObj = JSON.parse(jsonString);
    }
    catch(error){
      console.error("JSON parsing error: "+error);
      return jsonObj;
    }

    for(let obj of jsonObj){
      //no of fields check
      if(Object.keys(obj)?.length != 2){
        console.error("JSON obj do not have 2 fields");
        continue;
      }
      //fields name valid check
      if(!obj.id || !obj.quantity){
        console.error("JSON obj do not contain id/quantity");
        continue;
      }
      //valid value check
      let id:string = obj.id.toString()
      if(id == "" || !id || id == null || parseInt(id) > 30){
        console.error("JSON obj has invalid id");
        continue;
      }
      if(!parseInt(obj?.quantity)){
        console.error("JSON obj has invalid quantity");
        continue;
      }
      if(!(parseFloat(obj?.quantity)%1 == 0)){
        console.error("JSON obj has decimal quantity");
        continue;
      }
      if(parseInt(obj?.quantity) > 99){
        obj.quantity = 99;
      }
      correctJsonObj.push(obj);
    }
    let cartType:any = this.getCartType();
    localStorage.setItem(cartType,JSON.stringify(correctJsonObj));
    return correctJsonObj;
  }
}
