import { Component, EventEmitter, Inject, OnInit, Output, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-recovery-password-dialog',
  templateUrl: './recovery-password-dialog.component.html',
  styleUrls: ['./recovery-password-dialog.component.scss']
})
export class RecoveryPasswordDialogComponent implements OnInit {
  @Output() formRecoveryEvt: EventEmitter<any> = new EventEmitter<void>();
  constructor(
    private _dialogRef: MatDialogRef<RecoveryPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      formGroupDialog: FormGroup,
      statusMessage?: string,
      statusStyle?: string
    }
  ) {}

  ngOnInit(): void {
  }

  recoveryPassSubmit(){
    if(this.data.formGroupDialog.valid){
      this.formRecoveryEvt.emit(this.data.formGroupDialog.value);
      this._dialogRef.close();
    }else{
      this.data.formGroupDialog.markAllAsTouched();
    }
  }

  close(): void{
    this._dialogRef.close();
  }
}
