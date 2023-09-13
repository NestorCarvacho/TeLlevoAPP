import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImgService {
  private imagenPerfil: string = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  getImagenPerfil(): string {
    return this.imagenPerfil;
  }

  setImagenPerfil(url: string) {
    this.imagenPerfil = url;
  }
  constructor() { }

}
