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
  @Input() errorMessage: string = '';
  constructor() {
    console.log(this.formGroupLogin)
   }


  submitLogin(){
    this.loginEvt.emit(this.formGroupLogin.value);
  }
  ngOnInit(): void {
  }

}
