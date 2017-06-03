import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MountSpecComponent } from './mount-spec.component';

describe('MountSpecComponent', () => {
  let component: MountSpecComponent;
  let fixture: ComponentFixture<MountSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MountSpecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MountSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
