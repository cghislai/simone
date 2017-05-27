import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailsPageComponent } from './service-details-page.component';

describe('ServiceDetailsPageComponent', () => {
  let component: ServiceDetailsPageComponent;
  let fixture: ComponentFixture<ServiceDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
