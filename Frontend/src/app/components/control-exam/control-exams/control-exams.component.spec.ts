import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlExamComponent } from './control-exams.component';

describe('PatientsComponent', () => {
  let component: ControlExamComponent;
  let fixture: ComponentFixture<ControlExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
