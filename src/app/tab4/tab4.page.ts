import { Component, OnInit } from '@angular/core';
import { ImgService } from '../img.service';
import { ApiServiceService } from '../api-service.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private imagenPerfilService: ImgService, private apiService: ApiServiceService, private storage: Storage) { 
    
  }
  async conseguirPerfil(){
    let id = await this.storage.get('user_id');
  }
  usuarios: any;

  conductorData: any;

  ngOnInit() {
    
    this.storage.get('user_id').then(
      (userId: number | null) => {
        if (userId !== null) {
          // Hacer la solicitud a la API utilizando el user_id obtenido del almacenamiento
          this.apiService.getUserById(userId).subscribe(
            (data: any) => {
              this.usuarios = data;
              if (data && data.id && data.username && data.telefono && data.email) {
                this.conductorData = {
                  id: data.id,
                  nombre_usuario: data.username,
                  numero_telefono: data.telefono,
                  correo_electronico: data.email,
                  viajes_realizados: 0,
                  usuario: data.id,
                };
    
                // Hace la solicitud para crear el conductor con los datos obtenidos
                this.apiService.createConductor(this.conductorData).subscribe(
                  (response) => {
                    // Si se crea correctamente
                    console.log('Conductor creado correctamente:', response);
                  },
                  (error) => {
                    // Maneja los errores aquí
                  }
                );
              }
            },
            (error: any) => {
              // Maneja los errores aquí
            }
          );
        }
      },
      (storageError: any) => {
        // Maneja los errores aquí
      }
    );
  }

  getImagenPerfil(): string {
    return this.imagenPerfilService.getImagenPerfil();
  }
  
}
