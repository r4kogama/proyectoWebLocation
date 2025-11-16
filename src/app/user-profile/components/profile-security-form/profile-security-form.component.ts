import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'profile-security-form',
  templateUrl: './profile-security-form.component.html',
  styleUrls: ['./profile-security-form.component.scss']
 })
export class ProfileSecurityFormComponent implements OnInit {
  hide:boolean = true;
  @Input() formGroupAuth!: FormGroup;
  @Input() formGroupDelete!: FormGroup;
  @Output() updateAuthEvt: EventEmitter<any> = new EventEmitter();
  @Output() deleteAccountEvt: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {

  }

  submitPassword(){
    if(this.formGroupAuth.valid){
      this.updateAuthEvt.emit(this.formGroupAuth.value);
      this.formGroupAuth.reset();
    }else{
      this.formGroupAuth.markAllAsTouched();
    }
  }

  submitDelete(){
    if(this.formGroupDelete.valid){
      this.deleteAccountEvt.emit(this.formGroupDelete.value);
      this.formGroupDelete.reset();
    }else{
      this.formGroupDelete.markAllAsTouched();
    }
  }
}
