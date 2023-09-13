import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AyudaviajesPage } from './ayudaviajes.page';

describe('AyudaviajesPage', () => {
  let component: AyudaviajesPage;
  let fixture: ComponentFixture<AyudaviajesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AyudaviajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
