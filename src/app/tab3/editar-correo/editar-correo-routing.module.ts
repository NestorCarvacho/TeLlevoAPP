import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarCorreoPage } from './editar-correo.page';

const routes: Routes = [
  {
    path: '',
    component: EditarCorreoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarCorreoPageRoutingModule {}
