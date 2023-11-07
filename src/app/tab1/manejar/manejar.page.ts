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
  vehiculoData: any = {
    patente: '',
    marca: '',
    modelo: '',
    usuario: '',
  };

  constructor(private router: Router, private apiService: ApiServiceService, private storage: Storage) { }

  ngOnInit() {
  }

  async crearVehiculo(vehiculoData: any) {
    const userId = await this.storage.get('user_id');

    if (userId !== null) {
      const vehiculoData = {
        patente: this.vehiculoData.patente,
        marca: this.vehiculoData.marca,
        modelo: this.vehiculoData.modelo,
        usuario: userId,
      };

      this.apiService.createVehiculo(vehiculoData).subscribe(
        (response) => {
          this.router.navigate(['tabs/tab1/manejar']);
          console.log('Vehículo creado correctamente:', response);
        },
        (error) => {
          console.error('Error al crear vehículo:', error);
        }
      );
    } else {
      console.error('No se pudo obtener el user_id del almacenamiento local.');
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Aquí puedes manejar el archivo seleccionado, por ejemplo, puedes cargarlo a un servidor.
      console.log('Archivo seleccionado:', file.name);
    }
  }
 
  vehiculos: any;
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
