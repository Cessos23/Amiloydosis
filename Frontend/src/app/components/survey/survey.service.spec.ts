import { TestBed } from '@angular/core/testing';

import { SurveyService } from './survey.service';

describe('SurveyService', () => {
  let survey: SurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    survey = TestBed.inject(SurveyService);
  });

  it('should be created', () => {
    expect(survey).toBeTruthy();
  });
});
