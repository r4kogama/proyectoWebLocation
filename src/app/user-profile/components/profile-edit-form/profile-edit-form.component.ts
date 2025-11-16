import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'profile-edit-form',
  templateUrl: './profile-edit-form.component.html',
  styleUrls: ['./profile-edit-form.component.scss']
})
export class ProfileEditFormComponent implements OnInit {
  @Input() formGroupUpdate!:FormGroup;
  @Output() updatePersonalEvt = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  submitUpdate(){
    if(this.formGroupUpdate.valid){
      this.updatePersonalEvt.emit(this.formGroupUpdate.value);
      this.formGroupUpdate.reset();
    }else{
      this.formGroupUpdate.markAllAsTouched();
    }
  }
}
