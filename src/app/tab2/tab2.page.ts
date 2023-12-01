import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { DatosViajeService } from '../datos-viaje.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  viajes: any = [];
  
  constructor(private apiService: ApiServiceService, private router: Router, private datosViaje: DatosViajeService) {
  }

  ngOnInit() {
    this.obtenerViajes();
  }

  ngOnInitAfterView(){
    this.obtenerViajes();
  }
  
  obtenerViajes(){
    this.apiService.getViajes().subscribe(
      (data) => {
        this.viajes = data;
      },
      (error) => {
        console.error('Error al obtener viajes:', error);
      }
    );
  }

  verDetalles(idViaje: number) {
    this.apiService.getViajebyid(idViaje).subscribe(
      async (data) =>{
        this.datosViaje.setViajeData(data);
        this.router.navigate(['/tabs/tab2/detalle-viajes']);
      },
      (error) =>{
        console.error('Error al obtener viaje:', error);
      }
    );
  }
}
