import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import { AddToCartService } from './add-to-cart.service';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  constructor(private addToCart:AddToCartService) { }
  convertJSONToCSV(jsonData:any) {
    const modifiedData = jsonData.map((item: any) => {
      const { description, discount,rating,category,thumbnail,images, ...modifiedItem } = item;
      return modifiedItem;
    });
    modifiedData.forEach((obj:any) => {
      obj['quantity'] = this.addToCart.getQuantity(obj.id);
    });
    const csv = Papa.unparse(modifiedData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const blobUrl = URL.createObjectURL(blob);
    console.log(blobUrl);
    
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "order.csv";
    document.body.appendChild(link);
    link.dispatchEvent(
      new MouseEvent('click', { 
        bubbles: true, 
        cancelable: true, 
        view: window 
      })
    );
    document.body.removeChild(link);
  }
}
