import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private nuevoNombreSubject = new BehaviorSubject<string>('');
  nuevoNombre$ = this.nuevoNombreSubject.asObservable();

  private nuevoNumeroSubject = new BehaviorSubject<number>(0);
  nuevoNumero$ = this.nuevoNumeroSubject.asObservable();

  actualizarNuevoNombre(nuevoNombre: string) {
    this.nuevoNombreSubject.next(nuevoNombre);
  }

  actualizarNuevoNumero(nuevoNumero: number) {
    this.nuevoNumeroSubject.next(nuevoNumero);
  }
}