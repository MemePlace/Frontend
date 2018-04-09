import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseComponent } from './community/browse/browse.component';
import {CreateComponent} from './community/create/create.component';
import {AuthGuardService as AuthGuard} from './api/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BrowseComponent,
  },
  {
    path: 'create-community',
    component: CreateComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
