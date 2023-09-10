import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManejarPage } from './manejar.page';

describe('ManejarPage', () => {
  let component: ManejarPage;
  let fixture: ComponentFixture<ManejarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManejarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
