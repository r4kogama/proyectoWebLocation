import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss']
})
export class FormEditComponent implements OnInit {
  @Input() formGroupUpdate!:FormGroup;
  @Output() updatePersonalEvt = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  submitUpdate(){
    this.updatePersonalEvt.emit(this.formGroupUpdate.value);
  }
}
