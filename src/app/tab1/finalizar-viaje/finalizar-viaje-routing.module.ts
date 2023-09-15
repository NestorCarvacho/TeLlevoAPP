import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinalizarViajePage } from './finalizar-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: FinalizarViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalizarViajePageRoutingModule {}
