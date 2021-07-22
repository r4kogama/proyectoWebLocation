import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    MenuNavComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    MenuNavComponent
  ]
})
export class CommonsModule { }
