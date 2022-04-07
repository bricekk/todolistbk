import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddtaskPage } from './addtask.page';

const routes: Routes = [
  {
    path: '',
    component: AddtaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddtaskPageRoutingModule {}
