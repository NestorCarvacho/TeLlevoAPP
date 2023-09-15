import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroExitosoPage } from './registro-exitoso.page';

describe('RegistroExitosoPage', () => {
  let component: RegistroExitosoPage;
  let fixture: ComponentFixture<RegistroExitosoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistroExitosoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
