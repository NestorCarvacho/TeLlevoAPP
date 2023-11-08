import { Component, OnInit } from '@angular/core';
import { DatosUsuarioServiceService } from '../../datos-usuario-service.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-editar-numero',
  templateUrl: './editar-numero.page.html',
  styleUrls: ['./editar-numero.page.scss'],
})
export class EditarNumeroPage implements OnInit {

  constructor(
    private datosUsuarioService: DatosUsuarioServiceService, 
    private router: Router,
    private FormsModule: FormsModule,
    private sharedService: SharedService,
    private alertController: AlertController,
    private storage: Storage,
    private conductorService: ApiServiceService
  ) { }


  ngOnInit() {
  }

  nuevoNumero: number = 0;
  conductor: any;

  actualizarNumero() {
    this.storage.get('user_id').then(
      async (userId: number | null) => {
        if (userId !== null) {
          // Hacer la solicitud a la API utilizando el user_id obtenido del almacenamiento
          this.conductorService.getConductorById(userId).subscribe(
            async (data: any) => {
              this.conductor = data;
              if (this.conductor && this.conductor.usuario) {
                const conductorId = data.id;
                this.conductorService.actualizarNumero(conductorId, this.nuevoNumero)
                .subscribe(
                  response => {
                    this.router.navigate(['/tabs/tab3']);
                    this.sharedService.actualizarNuevoNumero(this.nuevoNumero);
                  },
                  error => {
                    this.mostrarErrorAlerta('Error del servidor.');
                  }
                );
              }
            },
            (error: any) => {
              // Maneja los errores aquí
              this.mostrarErrorAlerta('Error del servidor.');
            }
          );
        } else {
          this.mostrarErrorAlerta('Error del servidor.');
        }
      },
      (storageError: any) => {
        this.mostrarErrorAlerta('Error al cambiar el nombre de usuario.');
      }
    );
  }

  async mostrarErrorAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
  
    await alert.present();
  }



}
