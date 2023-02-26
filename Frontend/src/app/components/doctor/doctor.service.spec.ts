import { TestBed } from '@angular/core/testing';

import { DoctorService } from './doctor.service';

describe('DoctorService', () => {
  let doctor: DoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    doctor = TestBed.inject(DoctorService);
  });

  it('should be created', () => {
    expect(doctor).toBeTruthy();
  });
});
