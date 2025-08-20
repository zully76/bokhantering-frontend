import { TestBed } from '@angular/core/testing';

import { CitatService } from './citat.service';

describe('CitatService', () => {
  let service: CitatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
