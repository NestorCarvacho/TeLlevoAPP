import { Component, ElementRef, ViewChild } from '@angular/core';
import {GoogleMap} from '@capacitor/google-maps'
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  presentingElement: Element | null = null;
  presentingElement2: Element | null = null;
  @ViewChild('map') mapRef!: ElementRef;
  map!: GoogleMap;

  constructor() {
    this.map = {} as GoogleMap;
  }
  

  ngAfterViewInit() {
    // Obtén la referencia al elemento DOM después de que la vista se haya inicializado.
    this.presentingElement2 = document.querySelector('.ion-page');
    // Verifica si se encontró el elemento.
    if (this.presentingElement2) {
      // Haz algo con this.presentingElement aquí
    } else {
      console.error("No se encontró ningún elemento con la clase '.ion-page'");
    }
    
    // Obtén la referencia al elemento DOM después de que la vista se haya inicializado.
    this.presentingElement = document.querySelector('.ion-page');
    // Verifica si se encontró el elemento.
    if (this.presentingElement) {
      // Haz algo con this.presentingElement aquí
    } else {
      console.error("No se encontró ningún elemento con la clase '.ion-page'");
    }
  }

  ionViewDidEnter(){
    this.createMap();
  }

  async createMap(){
    this.map = await GoogleMap.create({
      id: 'mi-mapa',

      apiKey: environment.mapsKey,

      element: this.mapRef.nativeElement,

      // forceCreate: true,

      config: {
        center:{
          lat:33.6,
          lng: -117.9,
        },
        zoom:8 ,
      }

    })
  }

  
}
