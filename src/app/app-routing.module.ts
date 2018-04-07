import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseComponent } from './community/browse/browse.component';
import {CreateComponent} from './community/create/create.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BrowseComponent,
  },
  {
    path: 'create-community',
    component: CreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
