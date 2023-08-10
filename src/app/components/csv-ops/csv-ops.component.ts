import { Component } from '@angular/core';

@Component({
  selector: 'app-csv-ops',
  templateUrl: './csv-ops.component.html',
  styleUrls: ['./csv-ops.component.css']
})
export class CsvOpsComponent {
  submit(form:HTMLFormElement){
    const file = form['uploadCsv']
    console.log(file)
  }
}
