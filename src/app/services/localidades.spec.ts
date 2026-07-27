import { TestBed } from '@angular/core/testing';

import { Localidades } from './localidades';

describe('Localidades', () => {
  let service: Localidades;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Localidades);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
