import { TestBed } from '@angular/core/testing';

import { DatosUsuarioServiceService } from './datos-usuario-service.service';

describe('DatosUsuarioServiceService', () => {
  let service: DatosUsuarioServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosUsuarioServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
