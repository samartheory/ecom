import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as Papa from 'papaparse';

// let csvData :any
@Component({
  selector: 'app-csv-ops',
  templateUrl: './csv-ops.component.html',
  styleUrls: ['./csv-ops.component.css']
})
export class CsvOpsComponent {
  csvData:any
  getFile(event : any){
    Papa.parse(event.target.files[0],{
      complete: (results) =>{
        this.csvData = results.data
        console.log(this.csvData)
      }
    })
  }
}
