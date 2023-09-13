import { Component, OnInit } from '@angular/core';
import { DatosUsuarioServiceService } from '../../datos-usuario-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-editar-numero',
  templateUrl: './editar-numero.page.html',
  styleUrls: ['./editar-numero.page.scss'],
})
export class EditarNumeroPage implements OnInit {
  nuevoTelefono: string = '';

  

  constructor(private datosUsuarioService: DatosUsuarioServiceService, 
    private router: Router,
    private FormsModule: FormsModule) { }

    validarYActualizarTelefono() {
    if (this.nuevoTelefono.length <= 12) {
      this.datosUsuarioService.setTelefono(this.nuevoTelefono);
      this.router.navigate(['/tabs/tab3']);
    } else {
    }
  }
  
  ngOnInit() {
  }

}
