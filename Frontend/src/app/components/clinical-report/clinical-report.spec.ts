import { TestBed } from '@angular/core/testing';

import { ClinicalReportService } from './clinical-report.service';

describe('ClinicalReportService', () => {
  let medicalHistory: ClinicalReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    medicalHistory = TestBed.inject(ClinicalReportService);
  });

  it('should be created', () => {
    expect(medicalHistory).toBeTruthy();
  });
});
