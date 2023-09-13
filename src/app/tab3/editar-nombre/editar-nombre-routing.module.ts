import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarNombrePage } from './editar-nombre.page';

const routes: Routes = [
  {
    path: '',
    component: EditarNombrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarNombrePageRoutingModule {}
