import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleViajesPage } from './detalle-viajes.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleViajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleViajesPageRoutingModule {}
