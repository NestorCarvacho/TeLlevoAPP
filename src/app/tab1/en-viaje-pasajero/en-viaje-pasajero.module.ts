import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnViajePasajeroPageRoutingModule } from './en-viaje-pasajero-routing.module';

import { EnViajePasajeroPage } from './en-viaje-pasajero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnViajePasajeroPageRoutingModule
  ],
  declarations: [EnViajePasajeroPage]
})
export class EnViajePasajeroPageModule {}
