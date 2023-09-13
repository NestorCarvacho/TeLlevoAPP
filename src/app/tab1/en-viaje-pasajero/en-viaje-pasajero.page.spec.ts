import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnViajePasajeroPage } from './en-viaje-pasajero.page';

describe('EnViajePasajeroPage', () => {
  let component: EnViajePasajeroPage;
  let fixture: ComponentFixture<EnViajePasajeroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EnViajePasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
