// import { Tab1Page } from './tab1.page';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import * as mapbox from 'mapbox-gl';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  // @ViewChild('map',{static:false}) mapRef!: ElementRef;
  // map!: GoogleMap;

  presentingElement: Element | null = null;
  presentingElement2: Element | null = null;
<<<<<<< Updated upstream
  @ViewChild('map') mapRef!: ElementRef;
  map!: GoogleMap;

  constructor() {
    this.map = {} as GoogleMap;
  }
  
=======

  public map: mapbox.Map;
  constructor() {
  }

  constriurMapa() {
    this.map = new mapbox.Map({
      accessToken: environment.mapboxKey,
      container: 'mapbox',
      logoPosition: 'bottom-right',
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 15,
      center: [-70.578905, -33.598379],
      // keyboard: true,
      // trackResize:true,

    });


    this.map.addControl(new mapbox.NavigationControl());
    const marker = new mapbox.Marker({
      color: '#1A1A1A',
      draggable: false,
      scale: 1,
      
    })
      .setLngLat([-70.578905, -33.598379])
      .addTo(this.map);
  }
>>>>>>> Stashed changes

  ngAfterViewInit() {
    this.constriurMapa();

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

  // ionViewDidEnter(){
  //   this.createMap();
  // }

  // async createMap(){
  //   this.map = await GoogleMap.create({
  //     id: 'my-map',
  //     apiKey: environment.mapsKey,
  //     element: this.mapRef.nativeElement,
  //     // forceCreate: true,
  //     config: {
  //       center:{
  //         lat:33.6,
  //         lng: -117.9,
  //       },
  //       zoom:8 ,
  //     }

  //   });
  //   this.addMarkers();
  // }
  // async addMarkers(){

<<<<<<< Updated upstream
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

  
=======
  // }
>>>>>>> Stashed changes
}
