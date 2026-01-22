import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Container } from '@tsparticles/engine';

@Component({
  selector: 'form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})

export class FormRegisterComponent {
  @Input() formGroupRegister!: FormGroup;
  @Output() registerEvt = new EventEmitter();
  @Input() statusMessage: string = '';
  @Input() statusStyle: string = '';
  @Input() particlesId: string = 'particles-default';
  @Input() particlesOptions: any;
  @Output() particlesLoaded = new EventEmitter<any>();
  hide: boolean = true;
  hidePass: boolean = true;
  particlesContainer : Container;
  id: string = 'particles-default'; // Propiedad id agregada

  constructor() {}

  onParticlesLoaded(container: Container): void {
    if (!this.particlesContainer) {
      this.particlesContainer = container;
    }
  }

  submitRegister(){
    if(this.formGroupRegister.valid){
      if (this.particlesContainer) {
        this.particlesLoaded.emit(this.particlesContainer);
      }
      this.registerEvt.emit(this.formGroupRegister.value);
      this.formGroupRegister.reset();
    }else{
      this.formGroupRegister.markAllAsTouched();
    }
  }
}
