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
    localStorage.setItem(this.STORAGEMSG, message);
    localStorage.setItem(this.STORAGESTYLE, resultStyle);
  }

  getMessage(): Record<string, string> {
    const message = localStorage.getItem(this.STORAGEMSG) || '';
    if (message) {
      const style = localStorage.getItem(this.STORAGESTYLE) || '';
      localStorage.removeItem(this.STORAGEMSG);
      localStorage.removeItem(this.STORAGESTYLE);
      return { message: message, style: style };
    } else {
      return { message: '', style: '' };
    }
  }

  clearMessage(): void{
    const message = localStorage.getItem(this.STORAGEMSG) || '';
    if(message){
      localStorage.removeItem(this.STORAGEMSG);
      localStorage.removeItem(this.STORAGESTYLE);
    }
  }
}
