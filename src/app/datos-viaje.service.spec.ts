import { TestBed } from '@angular/core/testing';

import { DatosViajeService } from './datos-viaje.service';

describe('DatosViajeService', () => {
  let service: DatosViajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosViajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
