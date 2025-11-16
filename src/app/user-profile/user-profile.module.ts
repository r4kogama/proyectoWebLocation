import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileEditFormComponent } from './components/profile-edit-form/profile-edit-form.component';
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
import { ProfileSecurityFormComponent } from './components/profile-security-form/profile-security-form.component';



@NgModule({
  declarations: [
    ProfileComponent,
    ProfileEditFormComponent,
    HistoryLocationComponent,
    ListProfileComponent,
    DashboardComponent,
    NavDashboardComponent,
    ProfileSecurityFormComponent,

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
    ProfileEditFormComponent,
    HistoryLocationComponent,
    ListProfileComponent,
    DashboardComponent,
    NavDashboardComponent,
    ProfileSecurityFormComponent,

  ]
})
export class UserProfileModule { }
