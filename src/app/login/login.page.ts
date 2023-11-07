import { TabsPage } from './../tabs/tabs.page';
import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: any;
  password: any;
  respuestaLogin: any;

  constructor(private router: Router, private apiService: ApiServiceService) { }

  realizarLogin() {

    this.apiService.login(this.username, this.password).subscribe(
      (respuesta) => {
        this.respuestaLogin = respuesta;
        console.log('Respuesta del login:', respuesta);
        this.router.navigate(['./tabs']);
      },
      (error) => {
        console.error('Error en el login:', error);
        this.router.navigate(['login/registro']);
      }
    );
  }

  ngOnInit() {

  }
}

