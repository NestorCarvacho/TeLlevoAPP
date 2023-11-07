import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';

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


  constructor(private apiService: ApiServiceService) { }
  vehiculos: any[] = [];
  

  ngOnInit() {
    this.getVehiculos();
  }

  getVehiculos() {
    this.apiService.getVehiculos().subscribe(
      (response) => {
        this.vehiculos = response;
        console.log('Vehículos obtenidos correctamente:', response);
      },
      (error) => {
        console.error('Error al obtener vehículos:', error);
      }
    );
  }

}
