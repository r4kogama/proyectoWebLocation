import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormEditComponent } from './components/form-edit/form-edit.component';
import { HistoryLocationComponent } from './components/history-location/history-location.component';
import { ListProfileComponent } from './components/list-profile/list-profile.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {path:'profile/:id', component:ProfileComponent,
  children:[
    {path:'list',component:ListProfileComponent},
    {path:'edit',component:FormEditComponent},
    {path:'locations', component:HistoryLocationComponent},
     ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
