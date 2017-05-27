import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSpecComponent } from './service-spec.component';

describe('ServiceSpecComponent', () => {
  let component: ServiceSpecComponent;
  let fixture: ComponentFixture<ServiceSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSpecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
