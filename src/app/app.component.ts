import { Component } from '@angular/core';
import { ImgService } from './img.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private imagenPerfilService: ImgService) {}

  cargarNuevaImagen(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const archivos = inputElement.files;
  
    if (archivos && archivos.length > 0) {
      const archivoSeleccionado = archivos[0];
      const urlImagen = URL.createObjectURL(archivoSeleccionado);
  
      // Establecer la nueva imagen de perfil en el servicio compartido
      this.imagenPerfilService.setImagenPerfil(urlImagen);
    }
  }

}
