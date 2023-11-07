import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-detalle-viajes',
  templateUrl: './detalle-viajes.page.html',
  styleUrls: ['./detalle-viajes.page.scss'],
})
export class DetalleViajesPage implements OnInit {

  viajes: any[] = [];

  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {
    this.obtenerViajes();
  }

  obtenerViajes(){
    this.apiService.getViajes().subscribe(
      (data) => {
        console.log(data);
        this.viajes = data;
      },
      (error) => {
        console.error('Error al obtener viajes:', error);
      }
    );
  }
}
