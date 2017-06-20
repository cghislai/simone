import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlacementConstraintComponent} from './placement-constraint.component';

describe('PlacementConstraintComponent', () => {
  let component: PlacementConstraintComponent;
  let fixture: ComponentFixture<PlacementConstraintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlacementConstraintComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementConstraintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
