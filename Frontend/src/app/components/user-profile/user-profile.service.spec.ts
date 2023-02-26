import { TestBed } from '@angular/core/testing';

import { UserProfileService } from './user-profile.service';

describe('UserProfileService', () => {
  let doctor: UserProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    doctor = TestBed.inject(UserProfileService);
  });

  it('should be created', () => {
    expect(doctor).toBeTruthy();
  });
});
