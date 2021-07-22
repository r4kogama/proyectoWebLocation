import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './commons/home/home.component';
import { LocationComponent } from './geolocation/pages/location/location.component';
import { FormEditComponent } from './user-profile/components/form-edit/form-edit.component';
import { HistoryLocationComponent } from './user-profile/components/history-location/history-location.component';
import { ListProfileComponent } from './user-profile/components/list-profile/list-profile.component';
import { ProfileComponent } from './user-profile/pages/profile/profile.component';
import { UserLoginComponent } from './user/pages/user-login/user-login.component';
import { UserRegisterComponent } from './user/pages/user-register/user-register.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'login', component:UserLoginComponent},
  {path:'registro', component:UserRegisterComponent},
  {path:'geolocation', component:LocationComponent},
  {path:'', loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule)},
  {path:'**', component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
