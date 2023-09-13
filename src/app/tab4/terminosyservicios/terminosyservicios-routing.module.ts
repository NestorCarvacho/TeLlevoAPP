import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerminosyserviciosPage } from './terminosyservicios.page';

const routes: Routes = [
  {
    path: '',
    component: TerminosyserviciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerminosyserviciosPageRoutingModule {}
