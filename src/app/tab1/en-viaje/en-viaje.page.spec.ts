import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnViajePage } from './en-viaje.page';

describe('EnViajePage', () => {
  let component: EnViajePage;
  let fixture: ComponentFixture<EnViajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EnViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
