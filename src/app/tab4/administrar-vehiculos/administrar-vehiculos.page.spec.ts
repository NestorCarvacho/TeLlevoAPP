import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarVehiculosPage } from './administrar-vehiculos.page';

describe('AdministrarVehiculosPage', () => {
  let component: AdministrarVehiculosPage;
  let fixture: ComponentFixture<AdministrarVehiculosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdministrarVehiculosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
