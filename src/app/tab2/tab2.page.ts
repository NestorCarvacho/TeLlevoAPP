import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  viajes: any;
  
  constructor(private apiService: ApiServiceService) {
  }

  ngOnInit() {
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

}
