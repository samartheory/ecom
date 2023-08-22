import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as Papa from 'papaparse';
import { ToastService } from 'src/app/services/toast.service';

// let csvData :any
@Component({
  selector: 'app-csv-ops',
  templateUrl: './csv-ops.component.html',
  styleUrls: ['./csv-ops.component.css']
})
export class CsvOpsComponent {
  constructor(private toast:ToastService){}
  toDisplay:boolean = false
  csvData:any
  errors:any[] = []
  correctCsvHeaders:any[] = ["id","title","price","brand","quantity"]
  getFile(event : any){
    Papa.parse(event.target.files[0],{
      complete: (results) =>{
        this.toDisplay = false
        this.csvData = []
        this.errors = []
        this.csvData = results.data
        console.log(this.csvData);
      }
    })
  }

  submit(){
    if(this.errors.length == 0) this.validJson()
  }

  validJson(){
    //empty file check
    if(this.csvData.length == 0 || this.csvData.length == 1){      
      this.errors.push("Empty CSV")
      this.toast.handleError("Error in CSV file")
      return
    }

    for(let indexColumn in this.csvData){
      if(this.csvData[indexColumn].length != 5){
        this.errors.push("column:"+ (Number(indexColumn)+1) + " doesn't have 5 fields");
        this.toast.handleError("Error in CSV file")
        continue
      }
      for(let indexRow in this.csvData[indexColumn]){
        if(this.csvData[indexColumn][indexRow].length > 25){//length check
          this.errors.push("Value too large for row:" + (Number(indexRow)+1) + ", col:" + (Number(indexColumn)+1))
          this.toast.handleError("Error in CSV file")
          return
        }
        if(Number(indexColumn) == 0 && this.csvData[0][Number(indexRow)] != this.correctCsvHeaders[Number(indexRow)]){
          this.errors.push(this.csvData[0][Number(indexRow)]+" instead of "+this.correctCsvHeaders[Number(indexRow)] + " @ column:"+(Number(indexColumn)+1))
          this.toast.handleError("Error in CSV file")
          continue
        }
        if(!this.csvData[indexColumn][indexRow]){//null check each element
          this.errors.push(this.correctCsvHeaders[Number(indexRow)] +" doesn't exist for row:"+indexColumn+", col:"+indexColumn)
          this.toast.handleError("Error in CSV file")
          continue
        }
      }
      if(Number(indexColumn) == 0){
        continue
      }
      
      if(isNaN(this.csvData[indexColumn][2])){//price check
        this.errors.push("Price is invalid at column:"+ (Number(indexColumn)+1)+", Value :"+ this.csvData[indexColumn][2])
        this.toast.handleError("Error in CSV file")
      }
      if(isNaN(this.csvData[indexColumn][4])){//quantity check
        this.errors.push("Quantity is invalid at column :"+ (Number(indexColumn)+1)+", Value :"+this.csvData[indexColumn][4])
        this.toast.handleError("Error in CSV file")
      }
      if(this.errors.length == 0) {
        this.toDisplay = true;
        this.toast.handleSuccess("Success")
      }
      
    }
    // for(let index in this.csvData){
    //   //row length check
    //   if(this.csvData[index].length != 5){//todo header checks custom statements
    //     this.errors.push("row:"+ (Number(index)+1) + " doesn't have 5 fields");
    //     continue
    //   } 
    //   console.log(this.csvData);
      
    //   if(Number(index) == 0 && this.csvData[0][Number(index)] != this.correctCsvHeaders[Number(index)]){
    //     this.errors.push(this.csvData[0][Number(index)]+"instead of "+this.correctCsvHeaders[Number(index)] + " @ column:"+(Number(index)+1))
    //     continue
    //   }
    //   if(Number(index) == 0)continue
    //   if(isNaN(this.csvData[index][2])){
    //     this.errors.push("Price is invalid at column:"+ (Number(index)+1)+", Value :"+ this.csvData[index][2])
    //   }
    //   if(isNaN(this.csvData[index][4])){
    //     this.errors.push("Quantity is invalid at column :"+ (Number(index)+1))
    //   }
    //   if(this.errors.length == 0) {
    //     this.toDisplay = true;
    //     this.toast.handleSuccess("Success")
    //   }
    // }

    // id,title,description,price,discount,rating,brand,category,thumbnail,images
    //thead valid name check

    //todo change loops into for in loop

    //thead valid values check
  }



}
