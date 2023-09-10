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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
