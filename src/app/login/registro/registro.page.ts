import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  userData = {
    first_name: '',
    password: '',
    telefono: '',
    email: '',
    username: ''

  };
  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {
  }
  createUser() {

    this.apiService.createUser(this.userData).subscribe(
      (response) => {
        console.log('Usuario creado correctamente:', response);
      },
      (error) => {
        console.error('Error al crear usuario:', error);
      }
    );
  }

}
