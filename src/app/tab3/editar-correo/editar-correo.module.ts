import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarCorreoPageRoutingModule } from './editar-correo-routing.module';

import { EditarCorreoPage } from './editar-correo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarCorreoPageRoutingModule
  ],
  declarations: [EditarCorreoPage]
})
export class EditarCorreoPageModule {}
