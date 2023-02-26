import { TestBed } from '@angular/core/testing';

import { FollowUpPatientService } from './follow-up-patient.service';

describe('FollowUpPatientService', () => {
  let followUpPatient: FollowUpPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    followUpPatient = TestBed.inject(FollowUpPatientService);
  });

  it('should be created', () => {
    expect(followUpPatient).toBeTruthy();
  });
});
