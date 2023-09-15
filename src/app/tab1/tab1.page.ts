import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  presentingElement: Element | null = null;
  presentingElement2: Element | null = null;

  constructor() {}

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
}
