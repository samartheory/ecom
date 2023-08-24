import { Component, ViewChild } from '@angular/core';
import * as Papa from 'papaparse';
import { ToastService } from 'src/app/services/toast.service';

// let csvData :any
@Component({
  selector: 'app-csv-ops',
  templateUrl: './csv-ops.component.html',
  styleUrls: ['./csv-ops.component.css']
})
export class CsvOpsComponent {
  @ViewChild('fileInput') fileInput: any;
  constructor(private toast:ToastService){}
  public toDisplay:boolean = false
  public csvData:any
  public errors:any[] = []
  public correctCsvHeaders:any[] = ["id","title","price","brand","quantity"]

  getFile(event : any){
    Papa.parse(event.target?.files?.[0],{
      header: true,
      complete: (results) =>{
        this.toDisplay = false;
        this.errors = [];
        this.csvData = results?.data;                              
      }
    })
  }

  submit(){
    if(this.errors?.length == 0) this.validateJson();
    this.fileInput.nativeElement.value=''
  }
  
  validateJson(){
    if(!this.csvData){
      this.toast.handleError("No file selected");
      return;
    }
    //empty file check
    if(this.csvData?.length == 0){      
      this.errors.push("Empty CSV");
      this.toast.handleError("Error in CSV file");
      return;
    }
    
    for(let indexColumn in this.csvData){      
      if(Object.keys(this.csvData?.[indexColumn])?.length != 5){
        this.errors.push("column:"+ (Number(indexColumn)+1) + " doesn't have 5 fields");
        this.toast.handleError("Error in CSV file");
        continue;
      }
      let i:number =-1;
      for(let csvHeader in this.csvData?.[indexColumn]){
        i++;
        console.log(i);
        if(csvHeader != this.correctCsvHeaders[i]){
          if(!csvHeader) this.errors.push("Empty " + this.correctCsvHeaders[i] + " header");
          else this.errors.push(csvHeader+" instead of "+this.correctCsvHeaders[i] + " @ column:1");
          this.toast.handleError("Error in CSV file");
          continue;
        }
        let curValue = this.csvData?.[indexColumn]?.[csvHeader];
        // console.log(this.csvData?.[indexColumn]?.['quantity'].length);
        if(curValue == "null" || curValue == "undefined"){
          this.errors.push(csvHeader +  " is " + curValue + " in col:" + (Number(indexColumn)+2));
          this.toast.handleError("Error in CSV file");
          continue;
        }
        if(!curValue || curValue == '\n\n' || curValue?.length == 0){
          this.errors.push("Empty "+ this.correctCsvHeaders[i] + " @ column:" + (Number(indexColumn)+2))
          this.toast.handleError("Error in CSV file");
          continue;
        }
      }
      
      if(isNaN(this.csvData?.[indexColumn]?.['price'])){//price check
        this.errors.push("Price is invalid @ column:"+ (Number(indexColumn)+2)+", Value : "+ this.csvData?.[indexColumn]?.['price']);
        this.toast.handleError("Error in CSV file");
      }
      if(isNaN(this.csvData?.[indexColumn]?.['quantity'])){//quantity check
        this.errors.push("Quantity is invalid @ column :"+ (Number(indexColumn)+2)+", Value : "+this.csvData?.[indexColumn]?.['quantity']);
        this.toast.handleError("Error in CSV file");
      }
    }
    
    if(this.errors?.length == 0) {
      this.toDisplay = true;
      this.toast.handleSuccess("Success");
    }
  }



}
