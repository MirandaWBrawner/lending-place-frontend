import { TestBed } from '@angular/core/testing';

import { LendableService } from './lendable.service';

describe('LendableService', () => {
  let service: LendableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LendableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
