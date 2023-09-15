import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viajar',
  templateUrl: './viajar.page.html',
  styleUrls: ['./viajar.page.scss'],
})
export class ViajarPage implements OnInit {
  presentingElement: Element | null = null;

  constructor() { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit() {
    // Obtén la referencia al elemento DOM después de que la vista se haya inicializado.
    this.presentingElement = document.querySelector('.ion-page');
    // Verifica si se encontró el elemento.
    if (this.presentingElement) {
      // Haz algo con this.presentingElement aquí
    } else {
      console.error("No se encontró ningún elemento con la clase '.ion-page'");
    }
  }

}
