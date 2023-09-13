import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosUsuarioServiceService {
  private nombre: string = 'Nombre de usuario';
  private telefono: string = '+56912345678';
  private correo: string = 'correochofer@chofer.cl';

  getNombre(): string {
    return this.nombre;
  }

  getTelefono(): string {
    return this.telefono;
  }

  getCorreo(): string {
    return this.correo;
  }

  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  setTelefono(telefono: string): void {
    this.telefono = telefono;
  }

  setCorreo(correo: string): void {
    this.correo = correo;
  }
  constructor() { }
  
  
}
