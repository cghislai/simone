import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFilterDesiredStateComponent } from './task-filter-state.component';

describe('TaskFilterDesiredStateComponent', () => {
  let component: TaskFilterDesiredStateComponent;
  let fixture: ComponentFixture<TaskFilterDesiredStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskFilterDesiredStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFilterDesiredStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
