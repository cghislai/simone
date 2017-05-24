import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceModeComponent } from './service-mode.component';

describe('ServiceModeComponent', () => {
  let component: ServiceModeComponent;
  let fixture: ComponentFixture<ServiceModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
