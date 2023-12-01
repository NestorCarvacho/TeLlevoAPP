import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosViajeService {
  private viajeData = new BehaviorSubject<any>(null);
  currentViajeData = this.viajeData.asObservable();

  setViajeData(data: any) {
    this.viajeData.next(data);
  }

  constructor() { }
}
