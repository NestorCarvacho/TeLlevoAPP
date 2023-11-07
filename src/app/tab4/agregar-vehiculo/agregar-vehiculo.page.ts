import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';


@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.page.html',
  styleUrls: ['./agregar-vehiculo.page.scss'],
})
export class AgregarVehiculoPage implements OnInit {
    
  patente: string | undefined;
  modelo:String | undefined;
  marca:string | undefined;


  constructor(private router: Router, private apiService: ApiServiceService) { }

  ngOnInit() {
  }

  guardarVehiculo() {

    this.router.navigate(["tabs/tab4/administrar-vehiculos"])
    // Aquí puedes agregar la lógica para guardar los datos del vehículo en tu base de datos o en algún servicio.
    // Puedes utilizar Angular HTTP Client para enviar los datos al servidor, por ejemplo.
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Aquí puedes manejar el archivo seleccionado, por ejemplo, puedes cargarlo a un servidor.
      console.log('Archivo seleccionado:', file.name);
    }
  }
 
  vehiculoData = {
      patente: '',
      marca: '',
      modelo: ''
    };
    createAndTestVehiculo() {

    this.apiService.createVehiculo(this.vehiculoData).subscribe(
      (response) => {
        console.log('Vehículo creado correctamente:', response);
      },
      (error) => {
        console.error('Error al crear vehículo:', error);
      }
    );
  }
}
