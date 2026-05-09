import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Container } from '@tsparticles/engine';

@Component({
  selector: 'form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})

// DUMB COMPONENT: Solo presenta UI y emite eventos al padre
export class FormRegisterComponent {
  @Input() formGroupRegister!: FormGroup;
  @Input() particlesId: string = 'particles-default';
  @Input() particlesOptions: any;
  @Input() notificationPush?: Record<string, string> | null;
  @Input() messageError?: Record<string, string> | null;
  @Output() registerEvt = new EventEmitter();
  @Output() particlesLoaded = new EventEmitter<Container>();
  hide: boolean = true;
  hidePass: boolean = true;

  constructor() {}

  onParticlesLoaded(container: Container): void {
    if (container) {
      this.particlesLoaded.emit(container);
    }
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
