import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild('fileInput') fileInput: any;
  
  constructor() {}
  
  imagenPerfil: string = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  
  selectFile() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log('Archivo seleccionado:', selectedFile);
    }
  }
  cargarNuevaImagen(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const archivos = inputElement.files;
  
    if (archivos && archivos.length > 0) {
      const archivoSeleccionado = archivos[0];
      const urlImagen = URL.createObjectURL(archivoSeleccionado);
      this.imagenPerfil = urlImagen;
    }
  }
}
