import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarNumeroPageRoutingModule } from './editar-numero-routing.module';

import { EditarNumeroPage } from './editar-numero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarNumeroPageRoutingModule
  ],
  declarations: [EditarNumeroPage]
})
export class EditarNumeroPageModule {}
