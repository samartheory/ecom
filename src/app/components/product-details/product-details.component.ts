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
  productId: string = "";
  allProducts:any;
  reqProduct:any;
  quantity:any;
  constructor(private route: ActivatedRoute,private productData : ProductGetService,private router:Router,public addToCart : AddToCartService,public toast : ToastService) {
    this.productId = this.route.snapshot.paramMap.get('id') as string;
    if(this.productId){
      this.getServiceSubscribe()
    }
    this.updateQuantity()
  }
  getServiceSubscribe(){
    this.productData.products().subscribe((data) => {
      this.allProducts = data;
      this.reqProduct = this.allProducts.products.find((product: any) => product.id == this.productId);
      if(!this.reqProduct){
        this.router.navigate(['/not-found'])
      }
    });
  }
  commas(price:number){
    return price.toLocaleString();
  }

  increaseQuantity(){
    this.addToCart.increaseQuantity(this.productId)
    this.updateQuantity()
    this.toast.handleSuccess("Item Added to Cart")
  }
  decreaseQuantity(){
    this.addToCart.decreaseQuantity(this.productId)
    this.updateQuantity()
  }
  updateQuantity(){
    this.quantity = this.addToCart.getQuantity(this.productId)
  }
}
