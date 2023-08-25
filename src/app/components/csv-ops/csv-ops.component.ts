import { Component, ViewChild } from '@angular/core';
import * as Papa from 'papaparse';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { ProductGetService } from 'src/app/services/product-get.service';
import { ToastService } from 'src/app/services/toast.service';

// let csvData :any
@Component({
  selector: 'app-csv-ops',
  templateUrl: './csv-ops.component.html',
  styleUrls: ['./csv-ops.component.css']
})
export class CsvOpsComponent {
  @ViewChild('fileInput') fileInput: any;
  public productList:any;
  constructor(private toast:ToastService,private productGetService:ProductGetService){
    productGetService.getProducts().subscribe((data)=>{
      let allProducts:any;
      allProducts = data;
      this.productList = allProducts?.products;
    });
  }
  public toDisplay:boolean = false;
  public csvData:any;
  public errors:any[] = [];
  public correctCsvHeaders:any[] = ["id","title","price","brand","quantity"];

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
    this.fileInput.nativeElement.value='';
  }
  
  validateJson(){
    if(!this.csvData){
      this.toast.handleError("No file selected");
      return;
    }
    console.log(this.csvData)
    //empty file check
    if(this.csvData?.length == 0){      
      this.errors.push("Empty CSV");
      this.toast.handleError("Error in CSV file");
      return;
    }
    
    for(let indexColumn in this.csvData){      
      // console.log(Object.keys(this.csvData?.[indexColumn])?.length);
      console.log(this.csvData?.[indexColumn])
      if(Object.keys(this.csvData?.[indexColumn])?.length != 5){//length check
        
        this.errors.push("column:"+ (Number(indexColumn)+1) + " doesn't have 5 fields");
        this.toast.handleError("Error in CSV file");
        continue;
      }
      let i:number =-1;
      for(let csvHeader in this.csvData?.[indexColumn]){
        i++;
        if(csvHeader != this.correctCsvHeaders[i]){//header check
          if(!csvHeader) this.errors.push("Empty " + this.correctCsvHeaders[i] + " header");
          else this.errors.push(csvHeader+" instead of "+this.correctCsvHeaders[i] + " @ column:1");
          this.toast.handleError("Error in CSV file");
          continue;
        }
        let curValue = this.csvData?.[indexColumn]?.[csvHeader];
        if(curValue == "null" || curValue == "undefined"){//null check
          this.errors.push(csvHeader +  " is " + curValue + " in col:" + (Number(indexColumn)+2));
          this.toast.handleError("Error in CSV file");
          continue;
        }
        if(!curValue || curValue == '\n\n' || curValue?.length == 0){//null check
          this.errors.push("Empty "+ this.correctCsvHeaders[i] + " @ column:" + (Number(indexColumn)+2));
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
      if(!this.validateProduct(this.csvData?.[indexColumn])){//product validation
        this.errors.push("Product @ col:" +(Number(indexColumn)+2)+" doesn't exist in product list")
        this.toast.handleError("Error in CSV file");
        continue;
      }
      
    }
    this.mergeDuplicates();

    if(this.errors?.length == 0) {
      this.toDisplay = true;
      this.toast.handleSuccess("Success");
    }
  }

  validateProduct(jsonRow:any){
      for(let prod of this.productList){
        if(jsonRow['id'] == prod.id && jsonRow['title'] == prod.title && 
        jsonRow['brand'] == prod.brand && jsonRow['price'] == prod.price) return true
      }
    return false
  }

  mergeDuplicates(){
    let afterMerge:any = []
    let dup: Set<string> = new Set();
    for(let obj of this.csvData){
      if(dup.has(obj?.id)){
        for(let mObj of afterMerge){
          if(mObj?.id == obj?.id){
            mObj.quantity = Number(obj?.quantity) + Number(mObj?.quantity);
            continue;
          }
        }
        continue;
      }
      dup.add(obj?.id);
      afterMerge.push(obj);
    }
    console.log(afterMerge + "dfdfdf");
    
    this.csvData = afterMerge;
  }
  downloadCSV(){
    const fileUrl = '/assets/sample_csv.csv';
    const fileName = 'sample_csv.csv';

    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  }
