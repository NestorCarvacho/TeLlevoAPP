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
