import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarNombrePage } from './editar-nombre.page';

describe('EditarNombrePage', () => {
  let component: EditarNombrePage;
  let fixture: ComponentFixture<EditarNombrePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarNombrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
