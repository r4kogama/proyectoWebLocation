import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NormalizeService } from 'src/app/shared/services/normalize.service';

@Component({
  selector: 'form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {
  @Input() formGroupRegister!: FormGroup;
  @Output() registerEvt = new EventEmitter();
  @Input() statusMessage: string = '';
  @Input() statusStyle: string = '';
  hide: boolean = true;
  hidePass: boolean = true;
  constructor() { }


  ngOnInit(): void {

  }

  submitRegister(){
    if(this.formGroupRegister.valid){
      this.registerEvt.emit(this.formGroupRegister.value);
      this.formGroupRegister.reset();
    }else{
      this.formGroupRegister.markAllAsTouched();
    }
  }
}
