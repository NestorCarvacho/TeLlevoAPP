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

  realizarLogin() {
    this.apiService.login(this.username, this.password).subscribe(
      (respuesta) => {
        const userId = respuesta?.user_id;
        if (userId !== undefined) {
          {
            this.storageService.getStorage()?.set('user_id', userId);
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

