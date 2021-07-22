import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './commons/home/home.component';
import { LocationComponent } from './geolocation/pages/location/location.component';
import { ProfileComponent } from './user-profile/pages/profile/profile.component';
import { UserLoginComponent } from './user/pages/user-login/user-login.component';
import { UserRegisterComponent } from './user/pages/user-register/user-register.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'login', component:UserLoginComponent},
  {path:'registro', component:UserRegisterComponent},
  {path:'geolocation', component:LocationComponent},
  {path:'profile', component:ProfileComponent},
  {path:'profile/:id', component:ProfileComponent},
  {path:'**', component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
