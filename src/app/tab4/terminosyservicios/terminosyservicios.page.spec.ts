import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerminosyserviciosPage } from './terminosyservicios.page';

describe('TerminosyserviciosPage', () => {
  let component: TerminosyserviciosPage;
  let fixture: ComponentFixture<TerminosyserviciosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TerminosyserviciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
