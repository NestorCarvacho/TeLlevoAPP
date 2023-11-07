import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


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
  constructor(private apiService: ApiServiceService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }
  createUser() {

    this.apiService.createUser(this.userData).subscribe(
      (response) => {
        this.router.navigate(['login/registro-exitoso']);
      },
      (error) => {
        this.mostrarErrorAlerta('Error al crear registro, por favor compruebe los errores.');
      }
    );
  }

  async mostrarErrorAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
  
    await alert.present();
  }

}
