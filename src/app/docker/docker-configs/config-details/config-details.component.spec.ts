import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfigDetailsComponent} from './config-details.component';

describe('ConfigDetailsComponent', () => {
  let component: ConfigDetailsComponent;
  let fixture: ComponentFixture<ConfigDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigDetailsComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
