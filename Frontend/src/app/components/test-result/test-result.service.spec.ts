import { TestBed } from '@angular/core/testing';

import { TestResultService } from './test-result.service';

describe('TestResultService', () => {
  let testResult: TestResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    testResult = TestBed.inject(TestResultService);
  });

  it('should be created', () => {
    expect(testResult).toBeTruthy();
  });
});
