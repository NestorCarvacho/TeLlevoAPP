import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinalizarViajePage } from './finalizar-viaje.page';

describe('FinalizarViajePage', () => {
  let component: FinalizarViajePage;
  let fixture: ComponentFixture<FinalizarViajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FinalizarViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
