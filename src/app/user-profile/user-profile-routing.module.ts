import { ProfileSecurityFormComponent } from './components/profile-security-form/profile-security-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from '../user/pages/user-login/user-login.component';
import { ProfileEditFormComponent } from './components/profile-edit-form/profile-edit-form.component';
import { HistoryLocationComponent } from './components/history-location/history-location.component';
import { ListProfileComponent } from './components/list-profile/list-profile.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {path:'profile/:id', component:ProfileComponent,
  children:[
    {path:'list',component:ListProfileComponent},
    {path:'edit',component:ProfileEditFormComponent},
    {path:'locations', component:HistoryLocationComponent},
    {path:'security', component:ProfileSecurityFormComponent},
     ]
  },
  { path: 'login', component: UserLoginComponent },
  {path:'**',component:UserLoginComponent},
  {path:'', redirectTo:'login',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
