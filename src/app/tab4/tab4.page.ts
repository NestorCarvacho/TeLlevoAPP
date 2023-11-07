import { Component, OnInit } from '@angular/core';
import { ImgService } from '../img.service';
import { ApiServiceService } from '../api-service.service';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private imagenPerfilService: ImgService, private apiService: ApiServiceService, private storage: Storage, private storageService: AuthService) { 
    
  }
  async conseguirPerfil(){
    let id = await this.storage.get('user_id');
    console.log(id);
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
              console.log(data);
              this.conductorData = {
                id: data.id,
                nombre_usuario: data.username,
                numero_telefono: data.telefono, 
                correo_electronico: data.email,
                viajes_realizados: 0,
                usuario: data.id,
                };
                this.apiService.createConductor(this.conductorData).subscribe(
                  (response) => {
                    //si
                  },
                  (error) => {
                    //no
                  }
                );
            },
            (error: any) => {
              // Maneja los errores aquí
            }
          );
        } else {
          console.error('No se pudo obtener el user_id del almacenamiento local.');
        }
      },
      (storageError: any) => {
        console.error('Error al obtener el user_id del almacenamiento local:', storageError);
      }
    );
  }

  getImagenPerfil(): string {
    return this.imagenPerfilService.getImagenPerfil();
  }
  
  


}
