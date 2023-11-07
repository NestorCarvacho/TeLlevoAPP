import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  createVehiculo(vehiculoData: any) {
    return this.http.post<any>('http://127.0.0.1:8000/api/vehiculo/', vehiculoData);
  }

  getVehiculos(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/vehiculo/');
  }
  
  createUser(userData: any){
    return this.http.post<any>('http://127.0.0.1:8000/api/usuario/',userData);
  }
}
