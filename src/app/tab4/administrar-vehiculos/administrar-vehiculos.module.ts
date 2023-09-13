import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministrarVehiculosPageRoutingModule } from './administrar-vehiculos-routing.module';

import { AdministrarVehiculosPage } from './administrar-vehiculos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministrarVehiculosPageRoutingModule
  ],
  declarations: [AdministrarVehiculosPage]
})
export class AdministrarVehiculosPageModule {}