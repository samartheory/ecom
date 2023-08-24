import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductGetService } from 'src/app/services/product-get.service';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  private productId: string = "";
  private allProducts:any;
  public reqProduct:any;
  private quantity:any;
  constructor(private route: ActivatedRoute,private productGetService : ProductGetService,private router:Router,public addToCart : AddToCartService,public toast : ToastService) {
    this.productId = this.route.snapshot.paramMap?.get('id') as string;
    if(this.productId) this.getAllProducts()
    this.updateQuantity()
  }

  getAllProducts(){
    this.productGetService.getProducts().subscribe((data) => {
      this.allProducts = data;
      this.reqProduct = this.allProducts?.products?.find((product: any) => product?.id == this.productId);
      if(!this.reqProduct){
        this.router.navigate(['/not-found'])
      }
    });
  }

  increaseQuantity(){
    this.addToCart.increaseQuantity(this.productId)
    this.updateQuantity()
  }
  decreaseQuantity(){
    this.addToCart.decreaseQuantity(this.productId)
    this.updateQuantity()
  }
  updateQuantity(){
    this.quantity = this.addToCart.getQuantity(this.productId)
  }

  cartQuantity(id:any,element:any){
    let newQuantity:any = element.value
    if(isNaN(newQuantity)){
      this.toast.handleError("Quantity received is invalid")
      return
    }
    if(parseInt(newQuantity) < 0 || !(parseFloat(newQuantity)%1 == 0)){
      let quan:any = this.addToCart.getQuantity(id)
      element.value = quan
      this.toast.handleError(parseInt(newQuantity) < 0 ? "Quantity can't be negative" : "Quanity should not be fractional")
      return
    }
    if(parseInt(newQuantity) > 99){ 
      this.toast.handleError("Max quantity can not be more than 99")
      newQuantity = 99;
    }
    this.addToCart.updateQuantity(id,newQuantity)
  }
}

