import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManejarPage } from './manejar.page';

const routes: Routes = [
  {
    path: '',
    component: ManejarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManejarPageRoutingModule {}
