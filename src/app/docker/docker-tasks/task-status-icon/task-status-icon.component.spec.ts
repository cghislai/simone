import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskStatusIconComponent} from './task-status-icon.component';

describe('TaskStatusIconComponent', () => {
  let component: TaskStatusIconComponent;
  let fixture: ComponentFixture<TaskStatusIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskStatusIconComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskStatusIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
