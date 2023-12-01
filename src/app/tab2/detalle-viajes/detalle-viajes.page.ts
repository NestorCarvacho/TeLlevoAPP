import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { ActivatedRoute } from '@angular/router';
import { DatosViajeService } from 'src/app/datos-viaje.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle-viajes',
  templateUrl: './detalle-viajes.page.html',
  styleUrls: ['./detalle-viajes.page.scss'],
})
export class DetalleViajesPage implements OnInit {

  viaje: any;
  rutas: string[] = [];
  lat: number = -33.59813725425291;
  lng: number = -70.5782624941369;
  lngFin: number = 0;
  latFin: number = 0;
  public mapa: mapboxgl.Map;
  data: any;
  
  

  constructor(private apiService: ApiServiceService, private route: ActivatedRoute, private datosViaje: DatosViajeService) { }

  ngOnInit() {
    this.datosViaje.currentViajeData.subscribe((data) => {
      this.viaje = data;
    });
    
  }

  ngAfterViewInit(){
    this.ir(0);
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

    let startPoint = [-74.5, 40]; // Coordenadas del punto de inicio

    let endPoint = [-74.45, 40.1]; // Coordenadas del punto de destino
    

    startPoint = duoc;
    endPoint = [this.lngFin, this.latFin];
    var marker = new mapboxgl.Marker().setLngLat([duoc[0], duoc[1]]).addTo(map);
    var marker2 = new mapboxgl.Marker()
      .setLngLat([this.viaje.destino_lon, this.viaje.destino_lat])
      .addTo(map);
    // Utiliza la API de direcciones para obtener la ruta entre los dos puntos
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${this.viaje.inicio_lon},${this.viaje.inicio_lat};${this.viaje.destino_lon},${this.viaje.destino_lat}?steps=true&geometries=geojson&access_token=${environment.mapboxKey}`
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

}
