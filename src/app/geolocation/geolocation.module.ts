import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './pages/location/location.component';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersListLocationComponent } from './components/users-list-location/users-list-location.component';
import { CommonsModule } from '../commons/commons.module';



@NgModule({
  declarations: [
    LocationComponent,
    UsersListLocationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    CommonsModule
  ],
  exports: [
    LocationComponent,
    UsersListLocationComponent
  ]
})
export class GeolocationModule { }
