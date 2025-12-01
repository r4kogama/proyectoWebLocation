import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {
  hide:boolean = true;
  pass!: string;
  @Input() formGroupLogin!: FormGroup;
  @Input() formGroupDialog!: FormGroup;
  @Output() loginEvt: EventEmitter<any> = new EventEmitter();
  @Output() recoveryEvt : EventEmitter<any> = new EventEmitter();
  @Output() googleEvt: EventEmitter<any> = new EventEmitter<void>();
  @Input() statusMessage: string = '';
  @Input() statusStyle: string = '';
  @Input() messageNavigation?: Record<string, string>;
  @Output() statusEvt: EventEmitter<any> = new EventEmitter();
  @ViewChild('elementStatus', { static: false }) elementStatus! : ElementRef;
  constructor() {}


  submitLogin(){
    if (this.formGroupLogin.valid) {
      this.loginEvt.emit(this.formGroupLogin.value);
    } else {
      this.formGroupLogin.markAllAsTouched(); // muestra errores
    }
  }
  recoveryPass(){
    this.recoveryEvt.emit();
  }
  submitLoginGoogle(){
      this.googleEvt.emit();
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    console.log(this.elementStatus);
    if (this.elementStatus) {
      this.statusEvt.emit(this.elementStatus);
    }
  }
}
