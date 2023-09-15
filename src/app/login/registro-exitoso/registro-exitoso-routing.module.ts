import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroExitosoPage } from './registro-exitoso.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroExitosoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroExitosoPageRoutingModule {}
