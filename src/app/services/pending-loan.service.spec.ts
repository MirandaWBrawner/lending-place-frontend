import { TestBed } from '@angular/core/testing';

import { PendingLoanService } from './pending-loan.service';

describe('PendingLoanService', () => {
  let service: PendingLoanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendingLoanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
