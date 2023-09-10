import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleViajesPage } from './detalle-viajes.page';

describe('DetalleViajesPage', () => {
  let component: DetalleViajesPage;
  let fixture: ComponentFixture<DetalleViajesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalleViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
