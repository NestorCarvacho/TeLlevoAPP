import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'manejar',
    loadChildren: () => import('./manejar/manejar.module').then( m => m.ManejarPageModule)
  },
  {
    path: 'viajar',
    loadChildren: () => import('./viajar/viajar.module').then( m => m.ViajarPageModule)
  },  {
    path: 'en-viaje',
    loadChildren: () => import('./en-viaje/en-viaje.module').then( m => m.EnViajePageModule)
  },
  {
    path: 'en-viaje-pasajero',
    loadChildren: () => import('./en-viaje-pasajero/en-viaje-pasajero.module').then( m => m.EnViajePasajeroPageModule)
  },
  {
    path: 'finalizar-viaje',
    loadChildren: () => import('./finalizar-viaje/finalizar-viaje.module').then( m => m.FinalizarViajePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
