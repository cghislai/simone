import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RestartConditionComponent} from './restart-condition.component';

describe('RestartConditionComponent', () => {
  let component: RestartConditionComponent;
  let fixture: ComponentFixture<RestartConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RestartConditionComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestartConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
