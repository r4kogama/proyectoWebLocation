import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateMessageService {
  private readonly STORAGEMSG = 'stateMessage';
  private readonly STORAGESTYLE = 'stateStyle';

  private readonly stylesMap: { [key: string]: string } = {
    success: 'success',
    error: 'error',
  };
  setMessage(message: string, style: string): void {
    const resultStyle: string = this.stylesMap[style] || 'pending';
    sessionStorage.setItem(this.STORAGEMSG, message);
    sessionStorage.setItem(this.STORAGESTYLE, resultStyle);
  }

  getMessage(): Record<string, string> {
    const message = sessionStorage.getItem(this.STORAGEMSG) || '';
    if(message){
      const style = sessionStorage.getItem(this.STORAGESTYLE) || '';
      sessionStorage.removeItem(this.STORAGEMSG);
      sessionStorage.removeItem(this.STORAGESTYLE);
      return {message : message, style: style};
    }else{
      return {message : '', style: ''}
    }
  }
}
