import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroExitosoPageRoutingModule } from './registro-exitoso-routing.module';

import { RegistroExitosoPage } from './registro-exitoso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroExitosoPageRoutingModule
  ],
  declarations: [RegistroExitosoPage]
})
export class RegistroExitosoPageModule {}
