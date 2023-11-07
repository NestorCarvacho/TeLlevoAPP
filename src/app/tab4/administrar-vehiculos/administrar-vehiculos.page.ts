import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-administrar-vehiculos',
  templateUrl: './administrar-vehiculos.page.html',
  styleUrls: ['./administrar-vehiculos.page.scss'],
})
export class AdministrarVehiculosPage implements OnInit {
  isSelected: boolean = false;

  toggleSelection() {
    this.isSelected = !this.isSelected;
  }

  constructor( private apiService: ApiServiceService, private storage: Storage) { }
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


}
