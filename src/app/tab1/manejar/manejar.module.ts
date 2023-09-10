import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManejarPageRoutingModule } from './manejar-routing.module';

import { ManejarPage } from './manejar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManejarPageRoutingModule
  ],
  declarations: [ManejarPage]
})
export class ManejarPageModule {}
