import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-terminosyservicios',
  templateUrl: './terminosyservicios.page.html',
  styleUrls: ['./terminosyservicios.page.scss'],
})
export class TerminosyserviciosPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  constructor() {
    this.content = {} as IonContent;
   }

  ngOnInit() {
  }
  
  scrollToBottom() {
    // Tu código scrollToBottom aquí
    this.content.scrollToBottom(500);
  }

  scrollToTop() {
    // Tu código scrollToTop aquí
    this.content.scrollToTop(500);
  }

}
