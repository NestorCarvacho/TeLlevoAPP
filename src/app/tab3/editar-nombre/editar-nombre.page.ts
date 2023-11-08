import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editar-nombre',
  templateUrl: './editar-nombre.page.html',
  styleUrls: ['./editar-nombre.page.scss'],
})
export class EditarNombrePage implements OnInit {

  constructor(private conductorService: ApiServiceService, private storage: Storage, private router: Router,
    private sharedService: SharedService,
    private alertController: AlertController) { }

  ngOnInit() {

  }
  nuevoNombre: string = '';
  conductor: any;

  actualizarNombre() {
    this.storage.get('user_id').then(
      async (userId: number | null) => {
        if (userId !== null) {
          // Hacer la solicitud a la API utilizando el user_id obtenido del almacenamiento
          this.conductorService.getConductorById(userId).subscribe(
            async (data: any) => {
              this.conductor = data;
              if (this.conductor && this.conductor.usuario) {
                const conductorId = data.id;
                this.conductorService.actualizarNombre(conductorId, this.nuevoNombre)
                .subscribe(
                  response => {
                    this.router.navigate(['/tabs/tab3']);
                    this.sharedService.actualizarNuevoNombre(this.nuevoNombre);
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
