import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarCorreoPage } from './editar-correo.page';

describe('EditarCorreoPage', () => {
  let component: EditarCorreoPage;
  let fixture: ComponentFixture<EditarCorreoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarCorreoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
