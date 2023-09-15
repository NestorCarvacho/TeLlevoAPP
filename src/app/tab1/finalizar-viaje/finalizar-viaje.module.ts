import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalizarViajePageRoutingModule } from './finalizar-viaje-routing.module';

import { FinalizarViajePage } from './finalizar-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalizarViajePageRoutingModule
  ],
  declarations: [FinalizarViajePage]
})
export class FinalizarViajePageModule {}
