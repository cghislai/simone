import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HealthcheckConfigComponent} from './healthcheck-config.component';

describe('HealthcheckConfigComponent', () => {
  let component: HealthcheckConfigComponent;
  let fixture: ComponentFixture<HealthcheckConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HealthcheckConfigComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcheckConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
