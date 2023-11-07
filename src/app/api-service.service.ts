import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  
  private apiUrl: string = 'http://127.0.0.1:8000/';

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

  createConductor(conductorData: any){
    return this.http.post<any>('http://127.0.0.1:8000/api/conductor/',conductorData);
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
    .set('username', username)
    .set('password', password);

    return this.http.post<any>(`${this.apiUrl}api/login/`, body.toString(), { headers });
    
  }

  getUserById(userId: number) {
    const url = `${this.apiUrl}api/usuario/${userId}/`;
    return this.http.get(url);
  }

  getConductorById(conductorId: number) {
    const url = `${this.apiUrl}api/conductor/${conductorId}/`;
    return this.http.get(url);
  }

}
