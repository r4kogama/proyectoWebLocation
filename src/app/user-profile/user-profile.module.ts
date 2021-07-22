import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormEditComponent } from './components/form-edit/form-edit.component';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HistoryLocationComponent } from './components/history-location/history-location.component';
import { ListProfileComponent } from './components/list-profile/list-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { NavDashboardComponent } from './components/nav-dashboard/nav-dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { UserProfileRoutingModule } from './user-profile-routing.module';



@NgModule({
  declarations: [
    ProfileComponent,
    FormEditComponent,
    HistoryLocationComponent,
    ListProfileComponent,
    DashboardComponent,
    NavDashboardComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    UserProfileRoutingModule
  ],
  exports: [
    ProfileComponent,
    FormEditComponent,
    HistoryLocationComponent,
    ListProfileComponent,
    DashboardComponent,
    NavDashboardComponent,

  ]
})
export class UserProfileModule { }
