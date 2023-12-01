// import { Tab1Page } from './tab1.page';
// // // @Component({
// // //   selector: 'app-tab1',
// // //   templateUrl: 'tab1.page.html',
// // //   styleUrls: ['tab1.page.scss'],
// // // })

// // // export class Tab1Page implements AfterViewInit {
// // //   lat: number = -33.59813725425291;
// // //   lng: number = -70.5782624941369;

// // //   public popUp = new mapboxgl.Popup().setHTML('<p>Tu ubicación!</p>');
// // //   public marker = new mapboxgl.Marker({
// // //     draggable: true,
// // //     scale: 1,
// // //   });

// // //   searchTerm: string = '';
// // //   presentingElement: Element | null = null;
// // //   presentingElement2: Element | null = null;

// // //   public mapa: mapboxgl.Map;

// // //   ngAfterViewInit() {
// // //     this.constriurMapa();

// // //     this.presentingElement2 = document.querySelector('.ion-page');
// // //     if (!this.presentingElement2) {
// // //       console.error("No se encontró ningún elemento con la clase '.ion-page'");
// // //     }

// // //     this.presentingElement = document.querySelector('.ion-page');
// // //     if (!this.presentingElement) {
// // //       console.error("No se encontró ningún elemento con la clase '.ion-page'");
// // //     }

// // //     const list: NodeListOf<Element> = document.querySelectorAll(".list");

// // //     function activeLink(this: HTMLElement) {
// // //       list.forEach((item: Element) => item.classList.remove("active"));
// // //       this.classList.add("active");
// // //     }

// // //     list.forEach((item: Element) => item.addEventListener("click", activeLink));
// // //   }

// // //   constriurMapa() {
// // //     this.mapa = new mapboxgl.Map({
// // //       accessToken: environment.mapboxKey,
// // //       container: 'mapbox',
// // //       style: 'mapbox://styles/mapbox/streets-v12',
// // //       zoom: 13,
// // //       center: [this.lng, this.lat],
// // //     });

// // //     this.marker.setLngLat([this.lng, this.lat]);
// // //     this.marker.addTo(this.mapa);
// // //   }
// // // }
////////////////////////////////////////////////////////////////////////////////////////////////////////

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements AfterViewInit {
  constructor() {}
  ngAfterViewInit() {
    this.constriurMapa();
  }

  lngFin: number = 0;
  latFin: number = 0;

  // crear el mapbox
  public mapa: mapboxgl.Map;

  // direccion del Duoc
  lat: number = -33.59813725425291;
  lng: number = -70.5782624941369;

  ir(index: number) {
    const rutaSeleccionada = this.rutas[index];
    console.log('esta es la ruta seleccionada: '+ rutaSeleccionada);


    var duoc = [-70.57902808465514, -33.59778231829415];
    var map = new mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: 'mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [duoc[0], duoc[1]],
      zoom: 13,
    });

    var startPoint = [-74.5, 40]; // Coordenadas del punto de inicio

    var endPoint = [-74.45, 40.1]; // Coordenadas del punto de destino
    

    startPoint = duoc;
    endPoint = [this.lngFin, this.latFin];
    console.log(endPoint);
    var marker = new mapboxgl.Marker().setLngLat([duoc[0], duoc[1]]).addTo(map);
    var marker2 = new mapboxgl.Marker()
      .setLngLat([endPoint[0], endPoint[1]])
      .addTo(map);
    // Utiliza la API de direcciones para obtener la ruta entre los dos puntos
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${startPoint[0]},${startPoint[1]};${endPoint[0]},${endPoint[1]}?steps=true&geometries=geojson&access_token=${environment.mapboxKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        var route = data.routes[0].geometry;

        // Añade la ruta al mapa
        map.on('load', function () {
          map.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: route,
              },
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#3887be',
              'line-width': 5,
              'line-opacity': 0.75,
            },
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  direccion: string = '';

  rutas: string[] = [];

  buscar() {
    this.rutas = [];

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.direccion}.json?access_token=${environment.mapboxKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        var route = data;

        console.log(route['features']);
        var largo = route['features'].length;

        console.log(largo);
        if (largo > 0) {
          this.lngFin = route['features'][0]['center'][0];
          this.latFin = route['features'][0]['center'][1];
        }
        for (let index = 0; index < route['features'].length; index++) {
          const element = route['features'][index]['place_name'];
          console.log(element);
          this.rutas.push(element + index);
          const lng = route['features'][index]['center'][0];
          const lat = route['features'][index]['center'][1];
          console.log(index + 1 + ') Lng:' + lng + ' Lat:' + lat);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  constriurMapa() {
    this.mapa = new mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: 'mapbox',
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 13,
      center: [this.lng, this.lat],
    });
  }
}
