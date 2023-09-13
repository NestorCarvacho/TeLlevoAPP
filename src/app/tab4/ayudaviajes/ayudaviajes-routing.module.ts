import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AyudaviajesPage } from './ayudaviajes.page';

const routes: Routes = [
  {
    path: '',
    component: AyudaviajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AyudaviajesPageRoutingModule {}
