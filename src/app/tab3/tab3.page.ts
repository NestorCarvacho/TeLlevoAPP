import { Component, ViewChild } from '@angular/core';
import { ImgService } from '../img.service';
import { DatosUsuarioServiceService } from '../datos-usuario-service.service';
import { AuthService } from '../auth.service';
import { Storage } from '@ionic/storage-angular';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild('fileInput') fileInput: any;
  
  constructor(private imagenPerfilService: ImgService, 
    private apiService: ApiServiceService, private datosUsuarioService: DatosUsuarioServiceService, 
    private storage: Storage, private storageService: AuthService,
    private router: Router,
    private sharedService: SharedService) {}
  
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

  conductor: any;
  nuevoNombre: any;
  nuevoNumero: any;

  ngOnInit() {
    if (!this.sharedService.nuevoNombre$) {
      this.nuevoNombre = this.conductor.nombre_completo;
    }

    if (!this.sharedService.nuevoNumero$) {
      this.nuevoNumero = this.conductor.numero_telefono; // Reemplaza con la propiedad correcta del conductor
    }

    this.sharedService.nuevoNumero$.subscribe((nuevoNumero) => {
      this.nuevoNumero = nuevoNumero || this.conductor.numero_telefono; // Asigna un valor por defecto si no hay nuevo número
    });
  
    this.sharedService.nuevoNombre$.subscribe((nuevoNombre) => {
      this.nuevoNombre = nuevoNombre || this.conductor.nombre_completo;
    });
    this.storage.get('user_id').then(
      async (userId: number | null) => {
        if (userId !== null) {
          // Hacer la solicitud a la API utilizando el user_id obtenido del almacenamiento
          this.apiService.getConductorById(userId).subscribe(
            async (data: any) => {
              this.conductor = data;
              if (this.conductor && this.conductor.usuario) {
                const userEmail = this.conductor.usuario.email;
                console.log(data);
              }
            },
            (error: any) => {
              // Maneja los errores aquí
              console.error(error);
            }
          );
        } else {
          console.error('No se pudo obtener el user_id del almacenamiento local.');
        }
      },
      (storageError: any) => {
        console.error('Error al obtener el user_id del almacenamiento local:', storageError);
      }
    );
  }
}
