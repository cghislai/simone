import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdateStatusComponent} from './update-status.component';

describe('UpdateStatusComponent', () => {
  let component: UpdateStatusComponent;
  let fixture: ComponentFixture<UpdateStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateStatusComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
