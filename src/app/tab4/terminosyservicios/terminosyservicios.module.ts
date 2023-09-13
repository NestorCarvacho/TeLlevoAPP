import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerminosyserviciosPageRoutingModule } from './terminosyservicios-routing.module';

import { TerminosyserviciosPage } from './terminosyservicios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerminosyserviciosPageRoutingModule
  ],
  declarations: [TerminosyserviciosPage]
})
export class TerminosyserviciosPageModule {}
