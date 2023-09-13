import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarNumeroPage } from './editar-numero.page';

describe('EditarNumeroPage', () => {
  let component: EditarNumeroPage;
  let fixture: ComponentFixture<EditarNumeroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarNumeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
