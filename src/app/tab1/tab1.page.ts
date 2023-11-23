// import { Tab1Page } from './tab1.page';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
// import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  // @ViewChild('map',{static:false}) mapRef!: ElementRef;
  // map!: GoogleMap;

  // definicion de coordenadas
  lat: number = -33.59813725425291;
  lng: number = -70.5782624941369;
  
  
  public popUp = new mapboxgl.Popup().setHTML("<p>tu ubicacion!</p>");
  // ubicacion: { latitude: number, longitude: number } | null = null;
  
  
  public marker = new mapboxgl.Marker({
    // color: "#FFB800",
    draggable: true,
    scale:1,
    })


  presentingElement: Element | null = null;
  presentingElement2: Element | null = null;

  ngAfterViewInit() {
    this.constriurMapa();
    // this.constriurMapa2();

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

  public mapa: mapboxgl.Map;
  constructor() {}

  constriurMapa() {
    // var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    // this.mapa = new mapboxgl.Map({
    //   accessToken: environment.mapboxKey,
    //   container: 'mapbox',
    //   style: 'mapbox://styles/mapbox/streets-v12',
    //   zoom: 12,
    //   center: [this.lat, this.lng],
    // });
    // No es necesario requerir 'mapbox-gl' aquí, ya que lo importaste anteriormente.
    ////////////////////
    this.mapa = new mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: 'mapbox',
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 15,
      center: [this.lng, this.lat],
    });
    
    this.marker.setLngLat([this.lng, this.lat]);
    this.marker.addTo(this.mapa)
      //this.marker.setPopup(this.popUp);
  }
  // nuevoMapa() {
  //   // mapboxgl.accessToken ='pk.eyJ1IjoiZnJlZGNhbXBvczEyMzAiLCJhIjoiY2xudTl2d2VrMDlpbzJrcWpnYnJkc3JqbCJ9.hjid1kkpkU37wvVJrj2pQg';
  //   const mapa = new mapboxgl.Map({
  //     accessToken: environment.mapboxKey,
  //     container: 'mapa-box',
  //     style: 'mapbox://styles/mapbox/streets-v11',
  //     center: [this.lng, this.lat], // starting position
  //     zoom: 15,
  //   });

    // // this is where the code for the next step will go
    // const marker = new mapboxgl.Marker({
    //   color: "#FFFFFF",
    //   draggable: true,
    //   })
    //   .addTo(mapa)
    //   .setLngLat([this.lng, this.lat])
    //   .setPopup(new mapboxgl.Popup().setHTML("<p>tu ubicacion!</p>"));
  //}

  
////////////////////////////////////////////



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

  // }
  /////////////////////////////////////////////////////////////////////

  // constriurMapa2() {
  //   // ... (código existente)
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     // Asigna las coordenadas de la ubicación actual
  //     this.ubicacion = {
  //       latitude: resp.coords.latitude,
  //       longitude: resp.coords.longitude,
  //     };

  //     // Centra el mapa en la ubicación actual
  //     this.mapa.setCenter([this.ubicacion.longitude, this.ubicacion.latitude]);
  //   }).catch((error) => {
  //     console.log('Error al obtener la ubicación', error);
  //   });
  // }
  // nuevoMapa2() {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     const mapa = new mapboxgl.Map({
  //       accessToken: environment.mapboxKey,
  //       container: 'mapa-box',
  //       style: 'mapbox://styles/mapbox/streets-v11',
  //       center: [resp.coords.longitude, resp.coords.latitude],
  //       zoom: 15,
  //     });

  //     const marker = new mapboxgl.Marker({ 
  //       draggable: true 
  //     })
  //       .setLngLat([resp.coords.longitude, resp.coords.latitude])
  //       .addTo(mapa);
  //   }).catch((error) => {
  //     console.log('Error al obtener la ubicación', error);
  //   });
  // }



}

