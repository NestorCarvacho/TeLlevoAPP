import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrarVehiculosPage } from './administrar-vehiculos.page';

const routes: Routes = [
  {
    path: '',
    component: AdministrarVehiculosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrarVehiculosPageRoutingModule {}
