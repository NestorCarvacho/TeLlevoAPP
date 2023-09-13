import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  },  {
    path: 'editar-nombre',
    loadChildren: () => import('./editar-nombre/editar-nombre.module').then( m => m.EditarNombrePageModule)
  },
  {
    path: 'editar-numero',
    loadChildren: () => import('./editar-numero/editar-numero.module').then( m => m.EditarNumeroPageModule)
  },
  {
    path: 'editar-correo',
    loadChildren: () => import('./editar-correo/editar-correo.module').then( m => m.EditarCorreoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
