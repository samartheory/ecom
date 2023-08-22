import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentDateTime: string = '';
  ngOnInit() {
    this.updateTime(); // Initial call
    setInterval(() => {
      this.updateTime(); // Update every second
    }, 1000);
  }
  updateTime(): void {
    const currentDate = new Date();
    this.currentDateTime = currentDate.toLocaleString(); // Adjust formatting as needed
  }
}
