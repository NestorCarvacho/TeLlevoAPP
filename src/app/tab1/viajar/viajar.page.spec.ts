import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajarPage } from './viajar.page';

describe('ViajarPage', () => {
  let component: ViajarPage;
  let fixture: ComponentFixture<ViajarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViajarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
