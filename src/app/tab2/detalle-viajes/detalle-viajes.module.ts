import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleViajesPageRoutingModule } from './detalle-viajes-routing.module';

import { DetalleViajesPage } from './detalle-viajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleViajesPageRoutingModule
  ],
  declarations: [DetalleViajesPage]
})
export class DetalleViajesPageModule {}
