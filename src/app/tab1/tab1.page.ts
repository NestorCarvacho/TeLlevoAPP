import { Component, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})

export class Tab1Page implements AfterViewInit {
  lat: number = -33.59813725425291;
  lng: number = -70.5782624941369;

  public popUp = new mapboxgl.Popup().setHTML('<p>Tu ubicación!</p>');
  public marker = new mapboxgl.Marker({
    draggable: true,
    scale: 1,
  });

  searchTerm: string = '';
  presentingElement: Element | null = null;
  presentingElement2: Element | null = null;

  public mapa: mapboxgl.Map;

  ngAfterViewInit() {
    this.constriurMapa();

    this.presentingElement2 = document.querySelector('.ion-page');
    if (!this.presentingElement2) {
      console.error("No se encontró ningún elemento con la clase '.ion-page'");
    }

    this.presentingElement = document.querySelector('.ion-page');
    if (!this.presentingElement) {
      console.error("No se encontró ningún elemento con la clase '.ion-page'");
    }

    const list: NodeListOf<Element> = document.querySelectorAll(".list");

    function activeLink(this: HTMLElement) {
      list.forEach((item: Element) => item.classList.remove("active"));
      this.classList.add("active");
    }

    list.forEach((item: Element) => item.addEventListener("click", activeLink));
  }

  constriurMapa() {
    this.mapa = new mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: 'mapbox',
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 13,
      center: [this.lng, this.lat],
    });

    this.marker.setLngLat([this.lng, this.lat]);
    this.marker.addTo(this.mapa);
  }
}
