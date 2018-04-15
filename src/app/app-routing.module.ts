import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseComponent } from './community/browse/browse.component';
import { CreationComponent } from './creation/creation.component';
import { CreateComponent } from './community/create/create.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import {AuthGuardService as AuthGuard} from './api/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BrowseComponent,
  },
  {
    path: 'creation',
    component: CreationComponent
  }
    path: 'create-community',
    component: CreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'c/:name',
    component: BrowseComponent
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
