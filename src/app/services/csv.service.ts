import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  constructor() { }
  convertJSONToCSV(jsonData:any) {
    const csv = Papa.unparse(jsonData);
    console.log(csv)
    return csv;
  }
}
