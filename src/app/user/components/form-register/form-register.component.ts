import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {
  @Input() formGroupRegister!: FormGroup;
  @Output() registerEvt = new EventEmitter();
  @Input() errorMessage: string = '';
  constructor() { }


  ngOnInit(): void {

  }

  submitRegister(){
    this.registerEvt.emit(this.formGroupRegister.value);
    this.formGroupRegister.reset();
  }
}
