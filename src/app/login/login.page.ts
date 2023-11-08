import { TabsPage } from './../tabs/tabs.page';
import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: any;
  password: any;
  respuestaLogin: any;

  constructor(private router: Router, private apiService: ApiServiceService, private alertController: AlertController, private storageService: AuthService) { 

  }
  async ngOnInit() {
    const storage = this.storageService.getStorage();
  }

  userData = {
    first_name: '',
    password: '',
    telefono: '',
    email: '',
    username: ''

  };

  usuarios: any;

  realizarLogin() {
    this.apiService.login(this.username, this.password).subscribe(
      (respuesta) => {
        const userId = respuesta?.user_id;
        if (userId !== undefined) {
          {
            this.storageService.getStorage()?.set('user_id', userId);
            this.apiService.getUserById(userId).subscribe(
              (data: any) => {
                this.usuarios = data;
                if (data && data.id && data.username && data.telefono && data.email) {
                  const conductorData = {
                    id: data.id,
                    nombre_usuario: data.username,
                    numero_telefono: data.telefono,
                    correo_electronico: data.email,
                    nombre_completo : data.first_name,
                    viajes_realizados: 0,
                    usuario: data.id,
                  };
                  // Hace la solicitud para crear el conductor con los datos obtenidos
                  this.apiService.createConductor(conductorData).subscribe(
                    (response) => {
                      // Si se crea correctamente
                      console.log('Conductor creado correctamente:', response);
                    },
                    (error) => {
                      // Maneja los errores aquí
                    }
                  );
                }
              },
              (error: any) => {
                // Maneja los errores aquí
              }
            );
            this.router.navigate(['./tabs']);

          };
        } else {
          console.error('El campo user_id no está presente en la respuesta.');
          this.mostrarErrorAlerta('Error en la respuesta del servidor.');
        }
      },
      (error) => {
        console.error('Error en el login:', error);
        this.mostrarErrorAlerta('Credenciales incorrectas, compruebe su nombre de usuario y su contraseña.');
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

  handleClick(){
    this.router.navigate(['login/registro']);
  }
}

