import { Component, ViewChild } from '@angular/core';
import { ImgService } from '../img.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild('fileInput') fileInput: any;
  
  constructor(private imagenPerfilService: ImgService) {}
  
  selectFile() {
    this.fileInput.nativeElement.click();
  }
  
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
  getImagenPerfil(): string {
    return this.imagenPerfilService.getImagenPerfil();
  }

    onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log('Archivo seleccionado:', selectedFile);
    }
  }
}
