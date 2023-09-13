import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarVehiculoPage } from './agregar-vehiculo.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarVehiculoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarVehiculoPageRoutingModule {}
