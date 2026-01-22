import { Component, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss']
})
export class PushNotificationComponent {
  @ViewChild('elementStatus', { static: false }) elementStatus! : ElementRef;
  //@Output() statusEvt: EventEmitter<any> = new EventEmitter();
  @Input() messageNavigation?: Record<string, string>;

  constructor() { }


  /* ngAfterViewInit(): void {
    console.log(this.elementStatus);
    if (this.elementStatus) {
      this.statusEvt.emit(this.elementStatus);
    }
  } */
}
