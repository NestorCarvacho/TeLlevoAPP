import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab4Page } from './tab4.page';

const routes: Routes = [
  {
    path: '',
    component: Tab4Page
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'terminosyservicios',
    loadChildren: () => import('./terminosyservicios/terminosyservicios.module').then( m => m.TerminosyserviciosPageModule)
  },
  {

    path: 'administrar-vehiculos',
    loadChildren: () => import('./administrar-vehiculos/administrar-vehiculos.module').then( m => m.AdministrarVehiculosPageModule)
  },
  {
    path: 'ayudaviajes',
    loadChildren: () => import('./ayudaviajes/ayudaviajes.module').then( m => m.AyudaviajesPageModule)
  },  {
    path: 'agregar-vehiculo',
    loadChildren: () => import('./agregar-vehiculo/agregar-vehiculo.module').then( m => m.AgregarVehiculoPageModule)
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab4PageRoutingModule {}
