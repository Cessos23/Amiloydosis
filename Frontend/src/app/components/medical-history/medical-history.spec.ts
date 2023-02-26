import { TestBed } from '@angular/core/testing';

import { MedicalHistoryService } from './medical-history.service';

describe('MedicalHistoryService', () => {
  let medicalHistory: MedicalHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    medicalHistory = TestBed.inject(MedicalHistoryService);
  });

  it('should be created', () => {
    expect(medicalHistory).toBeTruthy();
  });
});
