import { TestBed } from '@angular/core/testing';

import { ContractService } from './contracts.service';

describe('ContractService', () => {
  let contract: ContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    contract = TestBed.inject(ContractService);
  });

  it('should be created', () => {
    expect(contract).toBeTruthy();
  });
});
