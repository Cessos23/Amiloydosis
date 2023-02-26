import { TestBed } from '@angular/core/testing';

import { ReportService } from './report.service';

describe('ReportService', () => {
  let report: ReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    report = TestBed.inject(ReportService);
  });

  it('should be created', () => {
    expect(report).toBeTruthy();
  });
});
