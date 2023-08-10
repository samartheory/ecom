import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { LoggedInComponent } from './components/logged-in/logged-in.component';

const routes: Routes = [
  {path:'products',component:ProductsComponent},
  {path:'product-detail/:id',component:ProductDetailsComponent},
  {path:'cart',component:CartComponent},
  {path:'login',component:LoginComponent},
  {path:'loggedin',component:LoggedInComponent},
  {path: '**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
