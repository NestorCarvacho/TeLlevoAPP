import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnViajePasajeroPage } from './en-viaje-pasajero.page';

const routes: Routes = [
  {
    path: '',
    component: EnViajePasajeroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnViajePasajeroPageRoutingModule {}
