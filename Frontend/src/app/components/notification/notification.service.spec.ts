import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let notification: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    notification = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(notification).toBeTruthy();
  });
});
