import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  constructor() { }
  convertJSONToCSV(jsonData:any) {
    const csv = Papa.unparse(jsonData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const blobUrl = URL.createObjectURL(blob);
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
