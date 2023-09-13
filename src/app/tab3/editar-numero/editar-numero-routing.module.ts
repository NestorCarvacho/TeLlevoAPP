import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarNumeroPage } from './editar-numero.page';

const routes: Routes = [
  {
    path: '',
    component: EditarNumeroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarNumeroPageRoutingModule {}
