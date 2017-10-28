import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfigDetailsPageComponent} from './config-details-page.component';

describe('ConfigDetailsPageComponent', () => {
  let component: ConfigDetailsPageComponent;
  let fixture: ComponentFixture<ConfigDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigDetailsPageComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
