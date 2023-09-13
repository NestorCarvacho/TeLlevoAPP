import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarNombrePageRoutingModule } from './editar-nombre-routing.module';

import { EditarNombrePage } from './editar-nombre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarNombrePageRoutingModule
  ],
  declarations: [EditarNombrePage]
})
export class EditarNombrePageModule {}
