import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  public currentDateTime: string = '';
  ngOnInit() {
    this.updateTime(); 
    setInterval(() => {
      this.updateTime(); 
    }, 1000);
  }
  updateTime(): void {
    const currentDate = new Date();
    this.currentDateTime = currentDate.toLocaleString(); 
  }
}
