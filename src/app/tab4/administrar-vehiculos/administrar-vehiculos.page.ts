import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrar-vehiculos',
  templateUrl: './administrar-vehiculos.page.html',
  styleUrls: ['./administrar-vehiculos.page.scss'],
})
export class AdministrarVehiculosPage implements OnInit {
  isSelected: boolean = false;

  toggleSelection() {
    this.isSelected = !this.isSelected;
  }


  constructor() { }
  

  ngOnInit() {
    
  }

  

}
