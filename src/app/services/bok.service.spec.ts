import { TestBed } from '@angular/core/testing';

import { BokService } from './bok.service';

describe('BookService', () => {
  let service: BokService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BokService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
