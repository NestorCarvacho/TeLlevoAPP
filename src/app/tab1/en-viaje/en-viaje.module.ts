import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnViajePageRoutingModule } from './en-viaje-routing.module';

import { EnViajePage } from './en-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnViajePageRoutingModule
  ],
  declarations: [EnViajePage]
})
export class EnViajePageModule {}
