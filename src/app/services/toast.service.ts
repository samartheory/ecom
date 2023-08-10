import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TOASTCONTENT } from '../interfaces/toast';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  showToast = new Subject<TOASTCONTENT>();

  constructor() { }
  
  handleSuccess(message: string) {
    console.log(message)
    let content:TOASTCONTENT = {
      type: 'success',
      message: message
    };
    this.showToast.next(content);
  }
  
  handleError(message: string) {
    let content:TOASTCONTENT = {
      type: 'error',
      message: message
    };
    this.showToast.next(content);
  }
}