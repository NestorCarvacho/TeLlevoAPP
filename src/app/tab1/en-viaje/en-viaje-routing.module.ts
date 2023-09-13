import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnViajePage } from './en-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: EnViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnViajePageRoutingModule {}
