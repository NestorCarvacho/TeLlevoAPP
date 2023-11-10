import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-manejar',
  templateUrl: './manejar.page.html',
  styleUrls: ['./manejar.page.scss'],
})

export class ManejarPage implements OnInit {

  constructor(private router: Router, private apiService: ApiServiceService, private storage: Storage) { }

  vehiculos: any;
  
  ngOnInit() {
    this.storage.get('user_id').then(
      async (userId: number | null) => {
        if (userId !== null) {
          this.apiService.getVehiculoById(userId).subscribe(
            async (data: any) => {
              this.vehiculos = data;
            },
            (error: any) => {
              // Maneja los errores aquí
              console.error(error);
            }
          );
        } else {
          //
        }
      },
      (storageError: any) => {
        //
      }
    );
  }

  

    
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Aquí puedes manejar el archivo seleccionado, por ejemplo, puedes cargarlo a un servidor.
      console.log('Archivo seleccionado:', file.name);
    }
  }
 
async sincronizar(){
  this.storage.get('user_id').then(
    async (userId: number | null) => {
      if (userId !== null) {
        this.apiService.getVehiculoById(userId).subscribe(
          async (data: any) => {
            this.vehiculos = data;
          },
          (error: any) => {
            // Maneja los errores aquí
            console.error(error);
          }
        );
      } else {
        //
      }
    },
    (storageError: any) => {
      //
    }
  );
}

}
