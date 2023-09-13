import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarVehiculoPage } from './agregar-vehiculo.page';

describe('AgregarVehiculoPage', () => {
  let component: AgregarVehiculoPage;
  let fixture: ComponentFixture<AgregarVehiculoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarVehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
