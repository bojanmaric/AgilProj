import { TestBed } from '@angular/core/testing';

import { KatalogService } from './katalog.service';

describe('KatalogService', () => {
  let service: KatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
