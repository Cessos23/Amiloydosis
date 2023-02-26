import { TestBed } from '@angular/core/testing';

import { ControlExamService } from './control-exam.service';

describe('ControlExamService', () => {
  let ControlExam: ControlExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    ControlExam = TestBed.inject(ControlExamService);
  });

  it('should be created', () => {
    expect(ControlExam).toBeTruthy();
  });
});
