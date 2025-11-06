import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {
  hide:boolean = true;
  pass!: string;
  title!: string;
  @Input() formGroupLogin!: FormGroup;
  @Output() loginEvt = new EventEmitter();
  @Output() googleEvt = new EventEmitter<void>();
  @Input() errorMessage: string = '';
  constructor() {}


  submitLogin(){
    if (this.formGroupLogin.valid) {
      this.loginEvt.emit(this.formGroupLogin.value);
    } else {
      this.formGroupLogin.markAllAsTouched(); // muestra errores
    }
  }
  submitLoginGoogle(){
      this.googleEvt.emit();
  }
  ngOnInit(): void {
  }

}
