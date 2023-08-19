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
  errors:any[] = []
  correctCsvHeaders:any[] = ["id","title","price","brand","quantity"]
  getFile(event : any){
    Papa.parse(event.target.files[0],{
      complete: (results) =>{
        this.csvData = []
        this.errors = []
        this.csvData = results.data
        console.log(this.csvData)
        this.validJson()
      }
    })
    
  }

  validJson(){
    console.log("inside valid");
    
    //empty file check
    if(this.csvData.length == 0){      
      this.errors.push("Empty CSV")
      return 0
    }
    //row length check
    for(let i=0;i<this.csvData.length;i++){
      if(this.csvData[i].length != 5){
        this.errors.push("row:"+ (i+1) + " has more than 5 fields")
      }
    }

    if(this.errors.length > 0)
      return 0
    // id,title,description,price,discount,rating,brand,category,thumbnail,images
    //thead valid name check
    for(let i=0;i<5;i++){
      if(this.csvData[0][i] != this.correctCsvHeaders[i]){
        this.errors.push(this.correctCsvHeaders[i] + " column:"+(i+1)+" is not present")
      }
    }
    
    if(this.errors.length > 0)
      return 0
    //thead valid values check
    for(let i=1;i<this.csvData.length;i++){      
      if(isNaN(this.csvData[i][2])){
        this.errors.push("Price is invalid at column :"+ (i+1))
      }
      if(isNaN(this.csvData[i][4])){
        this.errors.push("Quantity is invalid at column :"+ (i+1))
      }
    }
    if(this.errors.length > 0)
      return 0
    return 0
  }



}
