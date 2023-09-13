import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AyudaviajesPageRoutingModule } from './ayudaviajes-routing.module';

import { AyudaviajesPage } from './ayudaviajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AyudaviajesPageRoutingModule
  ],
  declarations: [AyudaviajesPage]
})
export class AyudaviajesPageModule {}
