import { TestBed } from '@angular/core/testing';

import { BackupService } from './backup.service';

describe('BackupService', () => {
  let doctor: BackupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    doctor = TestBed.inject(BackupService);
  });

  it('should be created', () => {
    expect(doctor).toBeTruthy();
  });
});
