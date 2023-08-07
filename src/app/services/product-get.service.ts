import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductGetService {

  constructor(private http:HttpClient) { }
  products(){
    return this.http.get('../../assets/products.json')
  }
}